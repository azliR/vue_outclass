<script setup lang="ts">
import { useSignInStore } from '@/stores/auth/signin-store'
import { useSettingsStore } from '@/stores/home/account/settings'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const i18n = useI18n()
const store = useSignInStore()
const settingsStore = useSettingsStore()

const currentTheme = useTheme()

const { t, availableLocales, locale } = i18n
const { emailRules, passwordRules, onSignInPressed, goToSignUpPage } = store
const { changeLanguage, changeTheme } = settingsStore

const { valid, showPassword, loading, error, email, password } =
  storeToRefs(store)

const showSnackbar = ref(false)
watch(error, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-main scrollable>
    <div class="px-4">
      <v-card class="mx-auto mt-6 pa-8" max-width="460">
        <div class="d-flex justify-space-between">
          <v-btn-toggle
            v-model="locale"
            rounded="xl"
            color="deep-purple-accent-3"
            variant="outlined"
            mandator
            divided
            @update:model-value="(v:string)=>changeLanguage(i18n, v)"
          >
            <v-btn
              v-for="locale in availableLocales"
              :key="locale"
              :value="locale"
              rounded="none"
              size="small"
              density="compact"
              variant="outlined"
            >
              {{ locale.toUpperCase() }}
            </v-btn>
          </v-btn-toggle>
          <v-btn-toggle
            v-model="currentTheme.name.value"
            rounded="xl"
            color="deep-purple-accent-3"
            variant="outlined"
            group
            mandatory
            divided
            @update:model-value="(v:string) => changeTheme(currentTheme, v)"
          >
            <v-btn
              value="darkTheme"
              icon="mdi-weather-night"
              rounded="none"
              size="small"
            ></v-btn>
            <v-btn
              value="lightTheme"
              icon="mdi-brightness-6"
              rounded="none"
              size="small"
            ></v-btn>
          </v-btn-toggle>
        </div>
        <img class="mb-5 mx-auto d-block" src="@/assets/logo.svg" width="56" />
        <p class="text-h5 text-center mb-2">{{ t('signin.title') }}</p>
        <p class="text-body-2 text-center mb-6">
          {{ t('signin.subtitle') }}
        </p>
        <v-form v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :label="t('signin.emailLabel')"
            :placeholder="t('signin.emailPlaceholder')"
            type="email"
            prepend-icon="mdi-email"
            required
          ></v-text-field>
          <div class="my-2"></div>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :label="t('signin.passwordLabel')"
            :placeholder="t('signin.passwordPlaceholder')"
            prepend-icon="mdi-lock"
            @click:append-inner.stop="showPassword = !showPassword"
            @keydown.enter="onSignInPressed"
            required
          ></v-text-field>

          <div class="d-block ml-auto">
            <v-btn color="primary" variant="text">
              {{ t('signin.forgotPasswordButton') }}
            </v-btn>
          </div>
          <div class="my-2"></div>
          <div class="d-flex justify-space-around mt-6">
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              variant="flat"
              @click="onSignInPressed"
            >
              {{ t('signin.submitButton') }}
            </v-btn>
          </div>
          <div class="d-flex justify-space-around mt-4">
            <v-btn color="primary" variant="text" @click="goToSignUpPage">
              {{ t('signin.createAccountButton') }}
            </v-btn>
          </div>
        </v-form>
      </v-card>
    </div>
  </v-main>
  <v-snackbar v-model="showSnackbar" color="error">
    {{ error }}
  </v-snackbar>
</template>
