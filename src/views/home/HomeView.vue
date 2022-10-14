<script setup lang="ts">
import { useHomeStore } from '@/stores/home/home';
import { storeToRefs } from 'pinia';

const store = useHomeStore();
const { onTabChange } = store;
const { selectedTab, tabs } = storeToRefs(store);
</script>

<template>
  <v-navigation-drawer expand-on-hover>
    <v-list nav>
      <v-list-item
        rounded="pill"
        active-color="primary"
        v-for="(tab, i) in tabs"
        :active="selectedTab === i"
        :key="tab.title"
        :title="tab.title"
        @click="onTabChange(tab, i)"
      >
        <template v-slot:prepend>
          <v-icon class="pl-6">{{ tab.icon }}</v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar
    v-if="
      $router.currentRoute.value.path.split('/').filter((e) => e !== '')
        .length <= 1 && selectedTab !== 1
    "
    density="prominent"
    :title="tabs[selectedTab].title"
  >
  </v-app-bar>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
  <v-bottom-navigation grow>
    <v-btn
      v-for="(tab, i) in tabs"
      :active="selectedTab === i"
      :key="tab.title"
      :prepend-icon="tab.icon"
      @click="onTabChange(tab, i)"
    >
      {{ tab.title }}
    </v-btn>
  </v-bottom-navigation>
</template>
