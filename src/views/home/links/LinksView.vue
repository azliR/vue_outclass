<script setup lang="ts">
import AppAddLinkDialog from '@/components/AddLinkDialog.vue';
import AppEmpty from '@/components/Empty.vue';
import AppError from '@/components/Error.vue';
import type { Link } from '@/models/link';

import { useAddLinkStore } from '@/stores/home/links/add-link';
import { useLinksStore } from '@/stores/home/links/links';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted } from 'vue';

const store = useLinksStore();
const addLinkStore = useAddLinkStore();

const {
  getLinks,
  onSavePressed,
  onCloseDialogPressed,
  onBackPressed,
  onEscapePressed,
} = store;

const { newLink } = storeToRefs(addLinkStore);
const { dialog, loading, error, links } = storeToRefs(store);

getLinks();

onMounted(() => {
  window.addEventListener('keyup', onEscapePressed);
});

onUnmounted(() => {
  window.removeEventListener('keyup', onEscapePressed);
  store.$reset();
});
</script>

<template>
  <v-dialog persistent fullscreen v-model="dialog" class="ma-4">
    <template v-slot:activator="{ props }">
      <v-app-bar
        density="prominent"
        :title="$router.currentRoute.value.params.folderId.toString()"
      >
        <template v-slot:prepend>
          <v-app-bar-nav-icon
            class="mt-2"
            icon="mdi-arrow-left"
            @click="onBackPressed"
          ></v-app-bar-nav-icon>
        </template>
      </v-app-bar>
      <v-main scrollable>
        <v-progress-linear
          v-if="loading"
          color="primary"
          indeterminate
        ></v-progress-linear>
        <v-container>
          <app-error
            v-if="error"
            :error="error"
            @refresh="getLinks"
          ></app-error>
          <app-empty v-else-if="links.length === 0"></app-empty>
          <v-expansion-panels v-else>
            <v-expansion-panel v-for="link in links" :key="link.id">
              <v-expansion-panel-title>
                {{ link.name }}
                <template v-slot:actions="{ expanded }">
                  <v-icon
                    color="secondary"
                    :icon="
                      expanded
                        ? 'mdi-chevron-up-circle'
                        : 'mdi-chevron-down-circle'
                    "
                  ></v-icon>
                </template>
              </v-expansion-panel-title>

              <v-expansion-panel-text>
                <p v-if="link.description" class="text-subtitle-2 my-1">
                  Description
                </p>
                <p v-if="link.description" class="text-body-2 mb-3">
                  {{ link.description }}
                </p>
                <p class="text-subtitle-2 my-1">Link</p>
                <a class="text-body-2" :href="link.url" target="_blank">
                  {{ link.url }}
                </a>
                <v-divider class="my-4"></v-divider>
                <v-row no-gutters>
                  <v-col>
                    <v-btn
                      block
                      variant="tonal"
                      prepend-icon="mdi-delete"
                      color="error"
                      >Hapus
                    </v-btn>
                  </v-col>
                  <v-col class="mx-2">
                    <v-btn
                      block
                      variant="tonal"
                      prepend-icon="mdi-pencil"
                      v-bind="props"
                      @click="newLink = link"
                      >Edit
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn block variant="flat" color="primary"> Buka </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
        <v-btn
          class="ma-4"
          rounded="lg"
          icon="mdi-plus"
          color="secondary"
          position="fixed"
          style="right: 0; bottom: 56px; z-index: 2"
          v-bind="props"
          @click="newLink = {} as Link"
        ></v-btn>
      </v-main>
    </template>
    <app-add-link-dialog
      @close="onCloseDialogPressed"
      @save="onSavePressed"
    ></app-add-link-dialog>
  </v-dialog>
</template>
