<script setup lang="ts">
import { useJoinStore } from '@/stores/classrooms/join-store'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import type { VForm } from 'vuetify/lib/components/VForm/index'

const store = useJoinStore()
const {
  studentIdRules,
  classCodeRules,
  onJoinPressed,
  goToCreateClassroom,
  goToScanCode,
  signOutAccount,
} = store
const { loading, error, studentId, classCode } = storeToRefs(store)

const form = ref<VForm>()

async function validate() {
  const { valid } = await form.value!.validate()

  if (valid) await onJoinPressed()
}

const showSnackbar = ref(false)
watch(error, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-main scrollable>
    <div class="px-4">
      <v-card class="mx-auto mt-6 pa-8" max-width="400">
        <p class="text-h5 text-center mb-2">Ayo join!</p>
        <p class="text-body-2 text-center">
          Masukin kode kelas kamu di bawah
          <span class="font-italic">
            (psst, tanyain kodenya ke temen kamu)
          </span>
        </p>
        <p class="text-body-2 text-center mt-4 mb-6">
          Belum buat kelasnya?
          <v-btn
            class="px-1 py-0 ma-0 text-body-2"
            variant="text"
            color="blue"
            size="small"
            @click="goToCreateClassroom"
          >
            Buat kelas
          </v-btn>
        </p>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="studentId"
            :rules="studentIdRules"
            label="NIM"
            placeholder="Masukin NIM kamu"
            prepend-icon="mdi-card-account-details-outline"
            required
          ></v-text-field>
          <v-text-field
            v-model="classCode"
            :rules="classCodeRules"
            label="Kode kelas"
            placeholder="Masukin kode kelas kamu"
            prepend-icon="mdi-numeric"
            required
            @keydown.enter="validate"
          ></v-text-field>
          <div class="d-flex justify-space-around mt-6">
            <v-btn
              :loading="loading"
              variant="flat"
              color="primary"
              @click="validate"
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
        <p class="text-body-2 text-center mt-6">
          Salah akun?
          <v-btn
            class="px-1 py-0 ma-0 text-body-2"
            variant="text"
            color="blue"
            size="small"
            @click="signOutAccount"
          >
            Keluar akun
          </v-btn>
        </p>
      </v-card>
    </div>
    <v-snackbar v-model="showSnackbar" color="error">
      {{ error }}
    </v-snackbar>
  </v-main>
</template>

<style></style>
