<script setup lang="ts">
import { useJoinStore } from '@/stores/auth/join';
import { storeToRefs } from 'pinia';

const store = useJoinStore();
const { classCodeRules, onJoinPressed, goToScanCode } = store;
const { valid, loading, classCode } = storeToRefs(store);
</script>

<template>
  <v-sheet class="mx-auto mt-6 pa-8" max-width="400">
    <p class="text-h5 text-center mb-2">Join sekarang!</p>
    <p class="text-body-2 text-center mb-6">
      Masukin kode kelas kamu di bawah
      <span class="font-italic">
        (psst, tanyain kodenya ke temen kamu kalo gak tau)
      </span>
    </p>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="classCode"
        :rules="classCodeRules"
        label="Kode kelas"
        placeholder="Masukin kode kelas kamu"
        required
      ></v-text-field>
      <div class="d-flex justify-space-around mt-6">
        <v-btn
          :disabled="!valid"
          :loading="loading"
          variant="flat"
          color="primary"
          @click="onJoinPressed"
        >
          Masuk sekarang
        </v-btn>
      </div>
    </v-form>
    <p class="text-caption text-center mt-6">kamu males ngetik?</p>
    <div class="d-flex justify-space-around mt-2">
      <v-btn
        prepend-icon="mdi-qrcode-scan"
        variant="tonal"
        size="x-large"
        @click="goToScanCode"
      >
        Scan QR
      </v-btn>
    </div>
  </v-sheet>
</template>

<style></style>
