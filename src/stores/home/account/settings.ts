import dayjs from 'dayjs';
import { defineStore } from 'pinia';
import type { ThemeInstance } from 'vuetify/lib/framework.mjs';

const languageKey = 'language';
const themeKey = 'theme';

export const useSettingsStore = defineStore('settings', {
  state() {
    return {
      language: <string | undefined>undefined,
      languageDialog: false,
      themeDialog: false,
    };
  },
  getters: {
    themes: () => ['lightTheme', 'darkTheme'],
  },
  actions: {
    setup(i18n: any, currentTheme: ThemeInstance) {
      const language = localStorage.getItem(languageKey);
      const themeName = localStorage.getItem(themeKey);

      if (language != null) {
        this.changeLanguage(i18n, language);
      }
      console.log('as');
      if (themeName != null) {
        this.changeTheme(currentTheme, themeName);
      }
    },
    changeLanguage(i18n: any, language: string) {
      i18n.locale.value = language;
      dayjs().locale(i18n.locale);
      localStorage.setItem(languageKey, language);
    },
    changeTheme(currentTheme: ThemeInstance, themeName: string) {
      currentTheme.global.name.value = themeName;
      localStorage.setItem(themeKey, themeName);
    },
    onBackPressed() {
      this.router.push({ name: 'account' });
    },
  },
});
