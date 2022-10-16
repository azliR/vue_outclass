<script setup lang="ts">
import { useHomeStore } from '@/stores/home/home';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const store = useHomeStore();
const { onTabChange } = store;
const { selectedTab, homeTabs } = storeToRefs(store);
</script>

<template>
  <v-navigation-drawer expand-on-hover>
    <v-list nav>
      <v-list-item
        rounded="pill"
        active-color="primary"
        v-for="(tab, i) in homeTabs"
        :active="selectedTab === i"
        :key="tab.title"
        :title="t(tab.title)"
        @click="onTabChange(tab, i)"
      >
        <template v-slot:prepend>
          <v-icon class="pl-6">{{
            selectedTab === i ? tab.activeIcon : tab.icon
          }}</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <v-bottom-navigation grow color="on-secondary-container">
    <v-btn
      v-for="(tab, i) in homeTabs"
      :active="selectedTab === i"
      :key="tab.title"
      :prepend-icon="selectedTab === i ? tab.activeIcon : tab.icon"
      @click="onTabChange(tab, i)"
    >
      {{ t(tab.title) }}
    </v-btn>
  </v-bottom-navigation>
</template>
