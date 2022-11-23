<script setup lang="ts">
import { useAddLinkStore } from '@/stores/home/directories/add-link';
import { storeToRefs } from 'pinia';

const emit = defineEmits(['close', 'save']);
const store = useAddLinkStore();
const { nameRules, urlRules, descriptionRules } = store;
const { valid, newLink } = storeToRefs(store);

function onClosePressed() {
  emit('close');
}
function onSavePressed() {
  emit('save', newLink);
}
</script>

<script setup lang="ts"></script>

<template>
  <v-card>
    <v-toolbar>
      <v-btn icon="mdi-close" @click="onClosePressed"> </v-btn>
      <v-toolbar-title>Tambah link baru</v-toolbar-title>
      <v-toolbar-items varian="tonal">
        <v-btn class="ma-2" height="40" variant="tonal" @click="onSavePressed">
          Simpan
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="newLink.name"
          :rules="nameRules"
          label="Judul"
          placeholder="Masukin judul buat link kamu"
          prepend-icon="mdi-format-title"
          required
        ></v-text-field>
        <v-text-field
          v-model="newLink.url"
          :rules="urlRules"
          label="Link"
          placeholder="Masukin link kamu"
          type="url"
          prepend-icon="mdi-link"
          required
        ></v-text-field>
        <v-textarea
          v-model="newLink.description"
          :rules="descriptionRules"
          label="Description"
          placeholder="Masukin deskripsinya"
          counter="255"
          prepend-icon="mdi-text"
        ></v-textarea>
      </v-form>
    </v-container>
  </v-card>
</template>
