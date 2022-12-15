<script setup lang="ts">
import type { CreateFolderDto } from '@/dtos/directory';
import { useAddFolderStore } from '@/stores/home/directories/add-folder';
import { storeToRefs } from 'pinia';

const emit = defineEmits({
  close: () => true,
  save: (folder: CreateFolderDto) => true,
});
const store = useAddFolderStore();
const { colors, nameRules, descriptionRules } = store;
const { valid, folder } = storeToRefs(store);

function onClosePressed() {
  emit('close');
}
function onSavePressed() {
  emit('save', folder.value);
}
</script>

<script setup lang="ts"></script>

<template>
  <v-card>
    <v-toolbar>
      <v-btn icon="mdi-close" @click="onClosePressed" variant="flat"> </v-btn>
      <v-toolbar-title>Buat Folder Baru</v-toolbar-title>
      <v-toolbar-items varian="tonal">
        <v-btn class="ma-2" height="40" variant="tonal" @click="onSavePressed">
          Simpan
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="folder.name"
          :rules="nameRules"
          label="Nama folder"
          placeholder="Masukin nama buat folder kamu"
          prepend-icon="mdi-format-title"
          required
        ></v-text-field>
        <v-textarea
          v-model="folder.description"
          :rules="descriptionRules"
          label="Description"
          placeholder="Masukin deskripsinya"
          counter="255"
          prepend-icon="mdi-text"
        ></v-textarea>
        <p class="ml-10 mb-2 text-subtitle-2">Warna folder</p>
        <div class="ml-9">
          <v-tooltip
            v-for="color in colors"
            :key="color.key"
            :text="color.key"
            location="top"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="ma-1"
                :color="color.color"
                rounded="lg"
                :icon="folder.color === color.key ? 'mdi-check-bold' : ''"
                size="small"
                @click="folder.color = color.key"
              >
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
