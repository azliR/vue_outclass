<script setup lang="ts">
import AppError from '@/components/AppError.vue';
import { useFoldersStore } from '@/stores/home/links/folders';
import type FolderTab from '@/stores/home/links/folders-wrapper';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  tab: {
    type: Object as () => FolderTab,
    required: true,
  },
});
const { t } = useI18n();
const store = useFoldersStore(props.tab.path)();

const { getFolders, onFolderPressed: onCategoryClick } = store;
const { loading, error, deleteDialog, linkFolders } = storeToRefs(store);
console.log(props);

onMounted(() => {
  getFolders(props.tab.path);
});
</script>

<template>
  <v-progress-linear
    v-if="loading"
    color="primary"
    indeterminate
  ></v-progress-linear>
  <app-error
    v-else-if="error"
    class="mt-4"
    :error="error"
    @refresh="() => getFolders(tab.path)"
  ></app-error>
  <v-container v-else>
    <v-alert
      class="mb-4"
      :text="t(tab.alert)"
      type="info"
      variant="tonal"
      closable
    ></v-alert>
    <v-sheet>
      <v-list bg-color="transparent">
        <v-list-item
          v-for="folder in linkFolders"
          :key="folder.id"
          :title="folder.name"
          @click="onCategoryClick(folder)"
          color="primary"
        >
          <template v-slot:prepend>
            <v-avatar color="secondary-container" rounded="lg">
              <v-icon color="secondary"> mdi-folder </v-icon>
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
              <v-list rounded="null">
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
      </v-list>
    </v-sheet>
  </v-container>
</template>
