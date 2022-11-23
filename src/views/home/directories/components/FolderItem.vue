<script setup lang="ts">
import type { Folder } from '@/models/directory';
import { useDirectoriesStore } from '@/stores/home/directories/directories';
import { storeToRefs } from 'pinia';

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  folder: {
    type: Object as () => Folder,
    required: true,
  },
});

const store = useDirectoriesStore(props.path)();

const { onCategoryPressed: onCategoryClick } = store;
const { deleteDialog } = storeToRefs(store);
</script>

<template>
  <v-list-item
    :title="props.folder.name"
    color="primary"
    @click="onCategoryClick(props.folder)"
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
</template>
