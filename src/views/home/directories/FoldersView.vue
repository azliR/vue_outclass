<script setup lang="ts">
import AppError from '@/components/AppError.vue';
import { DIRECTORY_TYPE_FOLDER, type Folder } from '@/models/directory';
import { useDirectoriesStore } from '@/stores/home/directories/directories';
import type FolderTab from '@/stores/home/directories/folders-wrapper';
import { useInfiniteScroll } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const props = defineProps({
  tab: {
    type: Object as () => FolderTab,
    required: true,
  },
});
const { t } = useI18n();
const store = useDirectoriesStore(props.tab.path)();

const { getDirectories, onCategoryPressed } = store;
const { loading, error, deleteDialog } = storeToRefs(store);
const route = useRoute();

const folders = ref<Folder[]>([]);

const parentDirectory = route.path.split('/')[2] ?? null;

getDirectories(DIRECTORY_TYPE_FOLDER, parentDirectory, 1, 10).then((data) => {
  console.log(
    '⛔ ~ file: FoldersView.vue ~ line 29 ~ getDirectories ~ data',
    data
  );
  folders.value = data;
});

const el = ref<HTMLElement | null>(null);
var page = 0;
useInfiniteScroll(
  el,
  () => {
    getDirectories(DIRECTORY_TYPE_FOLDER, parentDirectory, ++page, 10).then(
      (newDirectories) => {
        console.log(
          '🚀 ~ file: FoldersView.vue ~ line 39 ~ newDirectories',
          newDirectories
        );
        folders.value.push(...newDirectories);
      }
    );
  },
  { distance: 10 }
);
</script>

<template>
  <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
  <app-error v-else-if="error" class="mt-4" :error="error"></app-error>
  <v-container v-else>
    <v-alert
      class="mb-4"
      :text="t(tab.alert)"
      type="info"
      variant="tonal"
      closable
    ></v-alert>
    <v-list-item
      v-for="directory in folders"
      :key="directory.id"
      :title="directory.name"
      color="primary"
      @click="onCategoryPressed(directory)"
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon color="on-primary-container"> mdi-folder </v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-menu activator="parent">
          <template v-slot:activator="{ props }">
            <v-btn
              color="secondary"
              icon="mdi-dots-vertical"
              variant="text"
              v-bind="props"
            ></v-btn>
          </template>
          <v-list rounded="null" bg-color="surface">
            <v-dialog v-model="deleteDialog">
              <template v-slot:activator="{ props }">
                <v-list-item title="Ubah" density="compact">
                  <template v-slot:prepend>
                    <v-icon class="pl-4"> mdi-pencil </v-icon>
                  </template>
                </v-list-item>
                <v-list-item title="Hapus" density="compact" v-bind="props">
                  <template v-slot:prepend>
                    <v-icon class="pl-4"> mdi-delete </v-icon>
                  </template>
                </v-list-item>
              </template>

              <v-card
                title=" Hapus folder? "
                text="
                          AWAS! Kalo kamu hapus folder ini, semua link yang ada di
                          folder ini bakal ikutan kehapus juga! Beneran hapus?"
                elevation="3"
              >
                <v-card-actions class="mx-2">
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="deleteDialog = false">
                    Batal
                  </v-btn>
                  <v-btn
                    variant="flat"
                    color="error"
                    @click="deleteDialog = false"
                  >
                    Hapus
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-list>
        </v-menu>
      </template>
    </v-list-item>
  </v-container>
</template>
