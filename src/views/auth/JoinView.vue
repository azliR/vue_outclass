<script setup lang="ts">
import { useJoinStore } from '@/stores/auth/join-store'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const store = useJoinStore()
const { studentIdRules, classCodeRules, onJoinPressed, goToScanCode } = store
const { valid, loading, error, studentId, classCode } = storeToRefs(store)

const showSnackbar = ref(false)
watch(error, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-main scrollable>
    <div class="px-4">
      <v-card class="mx-auto mt-6 pa-8" max-width="400">
        <p class="text-h5 text-center mb-2">Ayo join!</p>
        <p class="text-body-2 text-center mb-6">
          Masukin kode kelas kamu di bawah
          <span class="font-italic">
            (psst, tanyain kodenya ke temen kamu kalo gak tau)
          </span>
        </p>
        <v-form v-model="valid" lazy-validation>
          <v-text-field
            v-model="studentId"
            :rules="studentIdRules"
            label="NIM"
            placeholder="Masukin NIM kamu"
            prepend-icon="mdi-card-account-details"
            required
          ></v-text-field>
          <v-text-field
            v-model="classCode"
            :rules="classCodeRules"
            label="Kode kelas"
            placeholder="Masukin kode kelas kamu"
            prepend-icon="mdi-numeric"
            required
            @keydown.enter="onJoinPressed"
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
      </v-card>
    </div>
    <v-snackbar v-model="showSnackbar" color="error">
      {{ error }}
    </v-snackbar>
  </v-main>
</template>

<style></style>
