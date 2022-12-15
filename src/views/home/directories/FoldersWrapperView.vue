<script setup lang="ts">
import AppCreateNewFolderDialog from '@/components/AppCreateNewFolderDialog.vue';
import type { CreateFolderDto } from '@/dtos/directory';
import { useDirectoriesStore } from '@/stores/home/directories/directories';
import { useDirectoriesWrapperStore } from '@/stores/home/directories/directories-wrapper';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { t } = useI18n();
const route = useRoute();
const { smAndDown, mdAndDown } = useDisplay();

const store = useDirectoriesWrapperStore();
const { getBreadcrumbs, createNewFolder, onTabChange, onBackPressed } = store;
const {
  currentFolder,
  selectedTabIndex,
  breadcrumbs,
  folderTabs,
  addDialog,
  errorSnackbar,
} = storeToRefs(store);

if (breadcrumbs.value.length === 0 && !route.params.folderId) {
  getBreadcrumbs(undefined);
}

watch(
  () => route.params,
  async (params) => {
    getBreadcrumbs(params.folderId as string | undefined);
  }
);

const paths = route.path.split('/');
const shareType = paths[2] ?? null;
const parentDirectoryId = paths[3] ?? null;

var directoriesStore = useDirectoriesStore(shareType, parentDirectoryId)();

async function saveFolderPressed(folder: CreateFolderDto) {
  const result = await createNewFolder({
    name: folder.name,
    color: folder.color,
    description: folder.description,
  });
  if (result) {
    directoriesStore.refresh();
  }
  addDialog.value = false;
}

const showSnackbar = ref(false);

watch(errorSnackbar, (state) => (showSnackbar.value = state != null));
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
      <v-list-item title="Folder baru" @click="addDialog = true">
        <template v-slot:prepend>
          <v-icon class="mr-3" color="primary"> mdi-folder </v-icon>
        </template>
      </v-list-item>
      <v-list-item title="Post baru">
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
  <v-dialog class="ma-4" v-model="addDialog" persistent fullscreen>
    <app-create-new-folder-dialog
      @close="addDialog = false"
      @save="saveFolderPressed"
    ></app-create-new-folder-dialog>
  </v-dialog>
</template>

<style scoped>
.scroll-main {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.v-dialog {
  max-width: 100%;
}
</style>
