<script setup lang="ts">
import { useSignInStore } from '@/stores/auth/signin';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';

const i18n = useI18n();
const { t, availableLocales, locale } = i18n;
const store = useSignInStore();

console.log(locale.value);

const {
  emailRules,
  passwordRules,
  onSignInPressed,
  togglePasswordVisibility,
  goToSignUpPage,
} = store;

const { valid, showPassword, loading, email, password } = storeToRefs(store);
</script>

<template>
  <v-main class="px-4">
    <v-btn-toggle
      v-model="locale"
      rounded="xl"
      color="deep-purple-accent-3"
      group
    >
      <v-btn
        v-for="locale in availableLocales"
        :key="locale"
        :value="locale"
        rounded="0"
        size="small"
      >
        {{ t(locale) }}
      </v-btn>
    </v-btn-toggle>
    <v-card class="mx-auto mt-6 pa-8" max-width="460">
      <img class="mb-5 mx-auto d-block" src="@/assets/logo.svg" width="64" />
      <p class="text-h5 text-center mb-2">{{ t('signin.title') }}</p>
      <p class="text-body-2 text-center mb-6">
        {{ t('signin.subtitle') }}
      </p>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :label="t('signin.emailLabel')"
          :placeholder="t('signin.emailPlaceholder')"
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
          @click:append-inner.stop="togglePasswordVisibility"
          required
        ></v-text-field>

        <div class="d-block ml-auto">
          <v-btn
            :loading="loading"
            color="primary"
            variant="text"
            @click="goToSignUpPage"
          >
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
            @click="onSignInPressed()"
          >
            {{ t('signin.submitButton') }}
          </v-btn>
        </div>
        <div class="d-flex justify-space-around mt-4">
          <v-btn
            :loading="loading"
            color="primary"
            variant="text"
            @click="goToSignUpPage"
          >
            {{ t('signin.createAccountButton') }}
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-main>
</template>
