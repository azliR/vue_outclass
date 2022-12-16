import { LANGUAGE_PREF_KEY, THEME_PREF_KEY } from '@/plugins/constants'
import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import type { ThemeInstance } from 'vuetify/lib/framework.mjs'

export const useSettingsStore = defineStore('settings', {
  state() {
    return {
      language: <string | undefined>undefined,
      languageDialog: false,
      themeDialog: false,
    }
  },
  getters: {
    themes: () => ['lightTheme', 'darkTheme'],
  },
  actions: {
    setup(i18n: any, currentTheme: ThemeInstance) {
      const language = localStorage.getItem(LANGUAGE_PREF_KEY)
      const themeName = localStorage.getItem(THEME_PREF_KEY)

      if (language != null) {
        this.changeLanguage(i18n, language)
      }
      console.log('as')
      if (themeName != null) {
        this.changeTheme(currentTheme, themeName)
      }
    },
    changeLanguage(i18n: any, language: string) {
      i18n.locale.value = language
      dayjs().locale(i18n.locale)
      localStorage.setItem(LANGUAGE_PREF_KEY, language)
    },
    changeTheme(currentTheme: ThemeInstance, themeName: string) {
      currentTheme.global.name.value = themeName
      localStorage.setItem(THEME_PREF_KEY, themeName)
    },
    onBackPressed() {
      this.router.push({ name: 'account' })
    },
  },
})
