<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAppStore } from './stores/app';

const store = useAppStore();
const { loading } = storeToRefs(store);
</script>

<template>
  <v-app>
    <v-system-bar v-if="loading" class="pa-0" color="transparent" height="2">
      <v-progress-linear indeterminate></v-progress-linear>
    </v-system-bar>
    <router-view />
  </v-app>
</template>

<style>
html {
  overflow-y: auto !important;
}
.v-btn {
  text-transform: unset !important;
}
.v-dialog {
  max-width: 540px;
}
</style>
