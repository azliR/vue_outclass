<script lang="ts">
import type { Link } from '@/models/link';
import { useAddLinkStore } from '@/stores/home/links/add-link';
import { mapState } from 'pinia';
import { defineComponent, type Prop } from 'vue';

export default defineComponent({
  name: 'app-add-link-dialog',
  props: {
    link: {
      type: Object as () => Prop<Link>,
      required: false,
    },
  },
  computed: {
    ...mapState(useAddLinkStore, [
      'valid',
      'newLink',
      'nameRules',
      'urlRules',
      'descriptionRules',
    ]),
  },
  methods: {
    onClosePressed() {
      this.$emit('close');
    },
    onSavePressed() {
      this.$emit('save', this.newLink);
    },
  },
});
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
