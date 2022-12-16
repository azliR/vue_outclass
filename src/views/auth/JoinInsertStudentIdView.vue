<script setup lang="ts">
import { useJoinStore } from '@/stores/auth/join-store'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const store = useJoinStore()
const { studentIdRules, onJoinPressed } = store
const { valid, loading, error, studentId, classCode } = storeToRefs(store)

classCode.value = route.params.classCode as string

const showSnackbar = ref(false)
watch(error, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-main scrollable>
    <div class="px-4">
      <v-card class="mx-auto mt-6 pa-8" max-width="400">
        <p class="text-h5 text-center mb-2">Satu langkah lagi!</p>
        <p class="text-body-2 text-center mb-6">
          Tinggal masukin NIM kamu di bawah, buat pengenal aja di kelas kamu~
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
      </v-card>
    </div>
  </v-main>
  <v-snackbar v-model="showSnackbar" color="error">
    {{ error }}
  </v-snackbar>
</template>

<style></style>
