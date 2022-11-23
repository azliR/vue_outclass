<script setup lang="ts">
import { useFoldersWrapperStore } from '@/stores/home/directories/folders-wrapper';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import FoldersView from './FoldersView.vue';

const { t } = useI18n();

const store = useFoldersWrapperStore();
const { folderTabs } = store;
const { selectedTab } = storeToRefs(store);
</script>

<template>
  <v-app-bar :title="t('home.homeTabs.files')">
    <template v-slot:extension>
      <v-tabs v-model="selectedTab" color="primary" optional>
        <v-tab
          v-for="(tab, i) in folderTabs"
          :key="i"
          :value="i"
          :title="t(tab.title)"
        >
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
  <v-main scrollable>
    <v-window v-model="selectedTab">
      <v-window-item v-for="(tab, i) in folderTabs" :key="i" :value="i">
        <folders-view :tab="tab"></folders-view>
      </v-window-item>
    </v-window>
  </v-main>
</template>

<style scoped></style>
