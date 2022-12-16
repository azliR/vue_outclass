<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore } from './stores/app'

const store = useAppStore()
const { loading } = storeToRefs(store)
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
  overflow-y: hidden !important;
}
.v-btn {
  text-transform: unset !important;
}
.v-dialog {
  max-width: 540px;
}
.scroll-main {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.scroll-container {
  flex: 1 1 auto;
  overflow-y: auto;
  --v-layout-left: 0px;
  --v-layout-right: 0px;
  --v-layout-top: 0px;
  --v-layout-bottom: 0px;
  max-width: 100%;
  position: relative;
}
</style>
