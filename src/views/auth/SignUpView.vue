<script setup lang="ts">
import { useSignUpStore } from '@/stores/auth/signup';
import { storeToRefs } from 'pinia';

const store = useSignUpStore();
const { nameRules, nimRules, onSignInPressed } = store;
const { valid, loading, name, nim } = storeToRefs(store);
</script>

<template>
  <v-main class="px-4">
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
          label="Nama lengkap"
          placeholder="Masukin nama lengkap kamu"
          prepend-icon="mdi-account"
          required
        ></v-text-field>
        <div class="my-2"></div>
        <v-text-field
          v-model="nim"
          :rules="nimRules"
          label="NIM (Nomor Induk Mahasiswa)"
          placeholder="Masukin NIM kamu"
          prepend-icon="mdi-card-account-details"
          required
        ></v-text-field>
        <div class="my-2"></div>
        <div class="d-flex justify-space-around mt-6">
          <v-btn
            :disabled="!valid"
            :loading="loading"
            color="primary"
            variant="flat"
            @click="onSignInPressed()"
          >
            Masuk sekarang
          </v-btn>
        </div>
        <div class="d-flex justify-space-around mt-4">
          <v-btn
            :loading="loading"
            color="primary"
            variant="text"
            @click.stop=""
          >
            Aku udah punya akun
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </v-main>
</template>
