<script setup lang="ts">
import { useSignUpStore } from '@/stores/auth/signup-store'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const store = useSignUpStore()
const {
  nameRules,
  emailRules,
  passwordRules,
  confirmPasswordRules,
  onSignUpPressed,
  goToSignInPage,
} = store
const {
  valid,
  loading,
  showPassword,
  showConfirmPassword,
  name,
  email,
  password,
  error,
} = storeToRefs(store)

const showSnackbar = ref(false)
watch(error, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-main scrollable>
    <div class="px-4">
      <v-card class="mx-auto mt-6 pa-8" max-width="460">
        <img class="mb-5 mx-auto d-block" src="@/assets/logo.svg" width="64" />
        <p class="text-h5 text-center mb-2">Buat akun kamu sekarang</p>
        <p class="text-body-2 text-center mb-6">
          Buat akunnya gampang banget, kamu cuman perlu masukin data di bawah,
          langsung cuss bisa nikmatin semua fitur di OutClass!
        </p>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            type="name"
            label="Nama lengkap"
            placeholder="Masukin nama lengkap kamu"
            prepend-icon="mdi-account"
            required
          ></v-text-field>
          <div class="my-2"></div>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            type="email"
            label="Email"
            placeholder="Masukin email kamu"
            prepend-icon="mdi-card-account-details"
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
            @keydown.enter="onSignUpPressed"
            required
          ></v-text-field>
          <v-text-field
            :rules="confirmPasswordRules"
            :type="showConfirmPassword ? 'text' : 'password'"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Konfirmasi Password"
            placeholder="Masukin password kamu lagi buat mastiin"
            prepend-icon="-"
            @click:append-inner.stop="
              showConfirmPassword = !showConfirmPassword
            "
            @keydown.enter="onSignUpPressed"
            required
          ></v-text-field>
          <div class="my-2"></div>
          <div class="d-flex justify-space-around mt-6">
            <v-btn
              :disabled="!valid"
              :loading="loading"
              color="primary"
              variant="flat"
              @click="onSignUpPressed()"
            >
              Masuk sekarang
            </v-btn>
          </div>
          <div class="d-flex justify-space-around mt-4">
            <v-btn color="primary" variant="text" @click="goToSignInPage">
              Aku udah punya akun
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
