<script setup lang="ts">
import { useHomeStore } from '@/stores/home/home';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { t } = useI18n();
const { mdAndDown } = useDisplay();

const store = useHomeStore();
const { onTabChange } = store;
const { selectedTab, homeTabs } = storeToRefs(store);
</script>

<template>
  <v-navigation-drawer expand-on-hover>
    <v-list>
      <v-list-item>
        <template v-slot:prepend>
          <img
            class="mx-3 my-1"
            color="on-secondary-container"
            width="28"
            src="@/assets/logo.svg"
          />
        </template>
        <template v-slot:title>
          <span> OutClass </span>
        </template>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list nav>
      <v-list-item
        rounded="pill"
        active-color="on-secondary-container"
        v-for="(tab, i) in homeTabs"
        :active="selectedTab === i"
        :key="tab.title"
        :title="t(tab.title)"
        @click="onTabChange(tab, i)"
      >
        <template v-slot:prepend>
          <v-icon class="pl-6" color="on-secondary-container">{{
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
  <v-bottom-navigation v-if="mdAndDown" grow color="on-secondary-container">
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
