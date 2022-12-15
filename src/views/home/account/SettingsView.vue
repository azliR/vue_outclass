<script setup lang="ts">
import { useSettingsStore } from '@/stores/home/account/settings';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useTheme } from 'vuetify';

const { t } = useI18n();
const store = useSettingsStore();
const { themes, changeLanguage, changeTheme, onBackPressed } = store;
const { themeDialog, languageDialog } = storeToRefs(store);

const currentTheme = useTheme();

const i18n = useI18n();
const { availableLocales } = i18n;
</script>

<template>
  <v-app-bar :title="t('settings.title')" density="prominent">
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        class="mt-2"
        icon="mdi-arrow-left"
        @click="onBackPressed"
      ></v-app-bar-nav-icon>
    </template>
  </v-app-bar>
  <v-main>
    <v-container>
      <v-sheet>
        <v-list lines="two">
          <v-list-subheader>{{ t('settings.display') }}</v-list-subheader>
          <v-dialog v-model="languageDialog">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="t('settings.language')"
                :subtitle="t(i18n.locale.value)"
              >
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon color="on-primary-container">
                      mdi-translate
                    </v-icon>
                  </v-avatar>
                </template>
                <template v-slot:append>
                  <v-avatar color="transparent">
                    <v-icon color="on-surface-variant"> mdi-menu-right </v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </template>
            <v-card :title="t('settings.selectLanguage')">
              <v-divider class="mt-2"></v-divider>
              <v-list rounded="0">
                <v-list-item
                  v-for="locale in availableLocales"
                  class="px-6"
                  :key="locale"
                  :title="t(locale)"
                  :prepend-icon="
                    i18n.locale.value == locale
                      ? 'mdi-radiobox-marked'
                      : 'mdi-radiobox-blank'
                  "
                  @click="changeLanguage(i18n, locale)"
                >
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-card-actions class="mx-2">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="languageDialog = false">
                  Pilih
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="themeDialog">
            <template v-slot:activator="{ props }">
              <v-list-item
                v-bind="props"
                :title="t('settings.theme')"
                :subtitle="t(currentTheme.name.value)"
              >
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon color="on-primary-container">
                      mdi-brightness-6
                    </v-icon>
                  </v-avatar>
                </template>
                <template v-slot:append>
                  <v-avatar color="transparent">
                    <v-icon color="on-surface-variant"> mdi-menu-right </v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </template>
            <v-card :title="t('settings.selectTheme')">
              <v-divider class="mt-2"></v-divider>
              <v-list rounded="0">
                <v-list-item
                  v-for="theme in themes"
                  class="px-6"
                  :key="theme"
                  :title="t(theme)"
                  :prepend-icon="
                    currentTheme.global.name.value == theme
                      ? 'mdi-radiobox-marked'
                      : 'mdi-radiobox-blank'
                  "
                  @click="changeTheme(currentTheme, theme)"
                >
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-card-actions class="mx-2">
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="themeDialog = false">
                  Pilih
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list>
      </v-sheet>
    </v-container>
  </v-main>
</template>

<style scoped>
.v-dialog {
  width: 400px;
}
</style>
