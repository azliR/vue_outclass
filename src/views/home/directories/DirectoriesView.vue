<script setup lang="ts">
import AppEmpty from '@/components/AppEmpty.vue'
import AppError from '@/components/AppError.vue'
import { useDirectoriesStore } from '@/stores/home/directories/directories-store'
import { useDirectoriesWrapperStore } from '@/stores/home/directories/directories-wrapper-store'
import { isDark } from '@/utils/colors'
import { useInfiniteScroll } from '@vueuse/core'
import bytes from 'bytes'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const route = useRoute()
const paths = route.path.split('/')
const shareType = paths[2] ?? null
const parentDirectoryId = paths[3] ?? null

var store = useDirectoriesStore(shareType, parentDirectoryId)()
var folderWrapperStore = useDirectoriesWrapperStore()

const {
  loadMore,
  onFilePressed,
  onDownloadFilePressed,
  getDownloadedFileKeys,
  onFolderPressed,
  getFileIcon,
  getFileColor,
  getFolderColor,
} = store
const { breadcrumbs, onUpdateFolderPressed, onDeleteFolderPressed } =
  folderWrapperStore

const {
  scrollContainer,
  folders,
  posts,
  downloadedFileKeys,
  hasNextPage,
  loadingFolder,
  loadingPost,
  errorFolder,
  errorPost,
  errorSnackbar,
} = storeToRefs(store)

getDownloadedFileKeys()

watch(
  () => errorSnackbar,
  async (errorSnackbar) => {
    folderWrapperStore.errorSnackbar = errorSnackbar.value
  }
)

const { t } = useI18n()
const { width } = useDisplay()

onMounted(() => {
  if (!folders.value && !posts.value) {
    loadMore(scrollContainer.value, false)
  }
})

useInfiniteScroll(
  scrollContainer,
  async () => {
    if (hasNextPage.value) {
      await loadMore(scrollContainer.value, true)
    } else {
      return
    }
  },
  { distance: 10 }
)
</script>

<template>
  <div class="scroll-container" ref="scrollContainer">
    <v-container>
      <v-breadcrumbs
        v-if="breadcrumbs.length > 1"
        class="pa-0"
        :items="breadcrumbs"
      >
        <template v-slot:title="{ item }">
          <v-btn class="ma-0" @click.stop="" variant="flat" size="small">
            {{ item.folderName }}
          </v-btn>
        </template>
        <template v-slot:divider>
          <v-icon
            class="pa-0 ma-0"
            icon="mdi-chevron-right"
            style="width: 0px"
          ></v-icon>
        </template>
      </v-breadcrumbs>
      <!-- <v-alert
        class="mb-4"
        :text="t(tab.alert)"
        type="info"
        variant="tonal"
        closable
      ></v-alert> -->
      <p v-if="folders && folders.length > 0" class="mx-3 text-overline">
        Folders
      </p>
      <div
        v-if="folders && folders.length > 0"
        class="mb-4"
        :style="{
          display: 'grid',
          'grid-template-columns':
            'repeat(' + Math.round(width / 400) + ', 1fr)',
        }"
      >
        <v-sheet
          class="ma-1"
          v-for="folder in folders"
          :key="folder.id"
          rounded="lg"
        >
          <v-list-item
            :title="folder.name"
            color="on-surface"
            rounded="lg"
            @click="onFolderPressed(folder)"
            @contextmenu.prevent=""
          >
            <template v-slot:prepend>
              <v-avatar :color="getFolderColor(folder.color)">
                <v-icon
                  :color="
                    isDark(getFolderColor(folder.color)) ? 'white' : 'black'
                  "
                >
                  mdi-folder
                </v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <v-btn color="secondary" icon="" variant="text">
                <v-icon>mdi-dots-vertical</v-icon>
                <v-menu activator="parent">
                  <v-list rounded="null" bg-color="surface">
                    <!-- <v-list-item title="Buat salinan" density="compact">
                      <template v-slot:prepend>
                        <v-icon class="pl-4"> mdi-content-copy </v-icon>
                      </template>
                    </v-list-item> -->
                    <v-list-item
                      title="Ubah"
                      density="compact"
                      @click="onUpdateFolderPressed(folder)"
                    >
                      <template v-slot:prepend>
                        <v-icon class="pl-4"> mdi-pencil </v-icon>
                      </template>
                    </v-list-item>
                    <v-list-item
                      title="Hapus"
                      density="compact"
                      @click="onDeleteFolderPressed(folder)"
                    >
                      <template v-slot:prepend>
                        <v-icon class="pl-4"> mdi-delete </v-icon>
                      </template>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
            </template>
          </v-list-item>
        </v-sheet>
      </div>
      <div v-if="loadingFolder" class="d-flex justify-center">
        <v-progress-circular class="ma-3" indeterminate></v-progress-circular>
      </div>
      <app-error
        v-if="errorFolder"
        class="mt-4"
        :error="errorFolder"
        @refresh="loadMore(scrollContainer, true)"
      ></app-error>
      <p v-if="posts && posts.length > 0" class="mx-3 text-overline">Posts</p>
      <div
        v-if="posts && posts.length > 0"
        :style="{
          display: 'grid',
          'grid-template-columns':
            'repeat(' + Math.round(width / 600) + ', 1fr)',
        }"
      >
        <v-sheet
          class="ma-1 px-4 py-3"
          v-for="post in posts"
          :key="post.id"
          rounded="lg"
        >
          <p class="text-subtitle-1">{{ post.name }}</p>
          <p class="text-body-2">{{ post.description }}</p>

          <div
            v-if="post.files"
            class="mt-2"
            :style="{
              display: 'grid',
              'grid-template-columns':
                'repeat(' + Math.round(width / 900) + ', 1fr)',
            }"
          >
            <v-list-item
              v-for="file in post.files"
              :key="file.link"
              class="ma-1 px-0 py-1"
              density="compact"
              rounded="lg"
              border
              @click="onFilePressed(file.link, file.type)"
            >
              <template v-slot:prepend>
                <v-icon class="mx-3" :color="getFileColor(file.type)">
                  {{ getFileIcon(file.type) }}
                </v-icon>
              </template>
              <template v-slot:title>
                <span class="text-subtitle-2">
                  {{ file.name }}
                </span>
              </template>
              <template v-slot:subtitle>
                <span class="text-caption">
                  {{ bytes(file.size, { unitSeparator: ' ' }) }}
                </span>
              </template>
              <template v-slot:append>
                <v-btn
                  v-if="file.type === 'link'"
                  class="mr-1"
                  icon="mdi-open-in-new"
                  variant="text"
                  size="small"
                >
                </v-btn>
                <v-btn
                  v-else-if="!downloadedFileKeys.includes(file.link)"
                  class="mr-1"
                  icon="mdi-download"
                  variant="text"
                  size="small"
                  @click.stop="onDownloadFilePressed(file.link, file.type)"
                >
                </v-btn>
              </template>
            </v-list-item>
          </div>
        </v-sheet>
      </div>
      <app-empty
        v-if="folders && posts && folders.length === 0 && posts.length === 0"
      ></app-empty>
      <div v-if="loadingPost" class="d-flex justify-center">
        <v-progress-circular class="ma-3" indeterminate></v-progress-circular>
      </div>
      <app-error v-if="errorPost" class="mt-4" :error="errorPost"></app-error>
    </v-container>
  </div>
</template>
