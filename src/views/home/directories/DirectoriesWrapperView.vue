<script setup lang="ts">
import { useDirectoriesStore } from '@/stores/home/directories/directories-store'
import { useDirectoriesWrapperStore } from '@/stores/home/directories/directories-wrapper-store'
import AppCreateFolderDialog from '@/views/home/directories/components/AppCreateFolderDialog.vue'
import AppCreatePostDialog from '@/views/home/directories/components/AppCreatePostDialog.vue'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { t } = useI18n()
const route = useRoute()
const { smAndDown, mdAndDown } = useDisplay()

const store = useDirectoriesWrapperStore()
const {
  getBreadcrumbs,
  deleteFolder,
  onTabChange,
  onAddPostPressed,
  onAddFolderPressed,
  onSaveFolderPressed,
  onClosePostPressed,
  onCloseFolderPressed,
  onCloseDeleteFolderPressed,
  onSavePostPressed,
  onBackPressed,
} = store
const {
  currentFolder,
  tempFolder,
  tempPost,
  selectedTabIndex,
  breadcrumbs,
  folderTabs,
  errorSnackbar,
  postDialog,
  folderDialog,
  deleteFolderDialog: deleteDialog,
} = storeToRefs(store)

if (breadcrumbs.value.length === 0 && !route.params.folderId) {
  getBreadcrumbs(undefined)
}

watch(
  () => route.params,
  async (params) => {
    getBreadcrumbs(params.folderId as string | undefined)
  }
)

const paths = route.path.split('/')
const shareType = paths[2] ?? null
const parentDirectoryId = paths[3] ?? null

var directoriesStore = useDirectoriesStore(shareType, parentDirectoryId)()

async function deleteFolderPressed() {
  deleteDialog.value = false
  const result = await deleteFolder()

  if (result) {
    const index =
      directoriesStore.folders?.findIndex(
        (folder) => folder.id === tempFolder.value?.id
      ) ?? -1
    if (index != -1) {
      directoriesStore.folders?.splice(index, 1)
    }
  }
  tempFolder.value = null
}

const showSnackbar = ref(false)

watch(errorSnackbar, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-app-bar
    :title="currentFolder ? currentFolder?.name : t('home.homeTabs.files')"
  >
    <template v-slot:prepend>
      <v-btn v-if="currentFolder" icon="mdi-arrow-left" @click="onBackPressed">
      </v-btn>
    </template>
    <template v-slot:extension>
      <v-btn
        v-if="!smAndDown"
        id="menu-add-activator"
        prepend-icon="mdi-plus"
        color="primary-container"
        elevation="1"
        position="fixed"
        size="large"
        style="left: 8px"
        variant="elevated"
      >
        Buat
      </v-btn>
      <div class="d-flex mx-auto">
        <v-btn-toggle
          v-model="selectedTabIndex"
          rounded="xl"
          color="deep-purple-accent-3"
          variant="outlined"
          group
          mandatory
          divided
          style="height: 44px"
          @update:model-value="(v:number) => onTabChange(v)"
        >
          <v-btn
            v-for="(tab, i) in folderTabs"
            :key="i"
            :value="i"
            rounded="none"
          >
            {{ t(tab.title) }}
          </v-btn>
        </v-btn-toggle>
      </div>
    </template>
  </v-app-bar>
  <v-main class="scroll-main">
    <router-view v-slot="{ Component }" :key="route.fullPath">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </v-main>
  <v-menu activator="#menu-add-activator">
    <v-sheet class="py-2">
      <v-list-item title="Folder baru" @click="onAddFolderPressed">
        <template v-slot:prepend>
          <v-icon class="mr-3" color="primary"> mdi-folder </v-icon>
        </template>
      </v-list-item>
      <v-list-item title="Post baru" @click="onAddPostPressed">
        <template v-slot:prepend>
          <v-icon class="mr-3" color="primary"> mdi-text-box </v-icon>
        </template>
      </v-list-item>
    </v-sheet>
  </v-menu>
  <v-snackbar v-model="showSnackbar" color="error">
    {{ errorSnackbar }}
  </v-snackbar>
  <v-btn
    v-if="smAndDown"
    id="menu-add-activator"
    class="ma-4"
    rounded="lg"
    icon="mdi-plus"
    color="primary-container"
    position="fixed"
    :style="{ right: 0, bottom: (mdAndDown ? 56 : 0) + 'px', 'z-index': 2 }"
  ></v-btn>
  <v-dialog
    class="ma-4 full-dialog"
    v-model="folderDialog"
    persistent
    fullscreen
  >
    <app-create-folder-dialog
      :folder="tempFolder"
      @close="onCloseFolderPressed"
      @save="(folder) => onSaveFolderPressed(directoriesStore, folder)"
    ></app-create-folder-dialog>
  </v-dialog>
  <v-dialog class="ma-4 full-dialog" v-model="postDialog" persistent fullscreen>
    <app-create-post-dialog
      :post="tempPost"
      @close="onClosePostPressed"
      @save="(post) => onSavePostPressed(directoriesStore, post)"
    ></app-create-post-dialog>
  </v-dialog>
  <v-dialog v-model="deleteDialog">
    <v-card
      title="Hapus folder? "
      text="Kalo kamu hapus folder ini, semua link yang ada di folder ini bakal ikutan kehapus juga! Beneran hapus?"
      elevation="3"
    >
      <v-card-actions class="mx-2">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onCloseDeleteFolderPressed">
          Batal
        </v-btn>
        <v-btn variant="flat" color="error" @click="deleteFolderPressed">
          Hapus
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.full-dialog {
  max-width: 100%;
}
</style>
