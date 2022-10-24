<script setup lang="ts">
import { useSignInStore } from '@/stores/auth/signin';
import { storeToRefs } from 'pinia';

const store = useSignInStore();
const { nameRules, nimRules, onSignInPressed } = store;
const { valid, loading, name, nim } = storeToRefs(store);
</script>

<template>
  <v-main class="px-4">
    <v-card class="mx-auto mt-6 pa-8" max-width="420">
      <p class="text-h5 text-center mb-2">Kamu siapa ya?</p>
      <p class="text-body-2 text-center mb-6">
        Sebelum dibolehin masuk kelas, lengkapin dulu data diri kamu biar
        temen-temen kamu pada tau kalo kamu itu si ganteng/cantik itu loh
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
      </v-form>
    </v-card>
  </v-main>
</template>
