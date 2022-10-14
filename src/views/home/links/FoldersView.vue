<script setup lang="ts">
import AppError from '@/components/Error.vue';
import { useFoldersStore } from '@/stores/home/links/folders';
import { storeToRefs } from 'pinia';

const store = useFoldersStore();
const { getCategories, onCategoryClick } = store;
const { loading, error, deleteDialog, linkFolders } = storeToRefs(store);

getCategories();
</script>

<template>
  <v-main scrollable>
    <v-progress-linear
      v-if="loading"
      color="primary"
      indeterminate
    ></v-progress-linear>
    <v-container>
      <app-error
        v-if="!!error"
        :error="error"
        @refresh="getCategories"
      ></app-error>

      <v-sheet v-else>
        <v-list bg-color="transparent">
          <v-list-item
            v-for="folder in linkFolders"
            :key="folder.id"
            :title="folder.name"
            @click="onCategoryClick(folder)"
            color="primary"
          >
            <template v-slot:prepend>
              <v-icon class="pl-3">mdi-folder</v-icon>
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
                <v-list>
                  <v-dialog v-model="deleteDialog">
                    <template v-slot:activator="{ props }">
                      <v-list-item title="Hapus" v-bind="props"></v-list-item>
                    </template>

                    <v-card
                      title=" Hapus folder? "
                      text="
                    AWAS! Kalo kamu hapus folder ini, semua link yang ada di
                    folder ini bakal ikutan kehapus juga! Beneran hapus?"
                    >
                      <v-card-actions class="mx-2"
                        ><v-spacer></v-spacer>
                        <v-btn color="primary" @click="deleteDialog = false"
                          >Batal</v-btn
                        >
                        <v-btn
                          variant="flat"
                          color="error"
                          @click="deleteDialog = false"
                          >Iya hapus</v-btn
                        >
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
  </v-main>
</template>

<style scoped>
.v-dialog {
  max-width: 400px;
}
</style>
