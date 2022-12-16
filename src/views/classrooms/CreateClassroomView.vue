<script setup lang="ts">
import { useCreateClassroomStore } from '@/stores/classrooms/create-classroom-store'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import type { VForm } from 'vuetify/lib/components/VForm/index'

const store = useCreateClassroomStore()
const {
  nameRules,
  descriptionRules,
  studentIdRules,
  onCreatePressed,
  goToJoinClassroom,
} = store
const { loading, error, name, description, studentId } = storeToRefs(store)

const form = ref<VForm>()

async function validate() {
  const { valid } = await form.value!.validate()

  if (valid) await onCreatePressed()
}

const showSnackbar = ref(false)
watch(error, (state) => (showSnackbar.value = state != null))
</script>

<template>
  <v-main scrollable>
    <div class="px-4">
      <v-card class="mx-auto mt-6 pa-8" max-width="400">
        <p class="text-h5 text-center mb-2">Ayo buat kelas!</p>
        <p class="text-body-2 text-center mb-6">
          Yuk buat kelas buat kamu sama temen kamu! Kalo bukan kamu siapa lagi,
          ya kan?
        </p>
        <v-form ref="form" lazy-validation>
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Nama kelas"
            placeholder="Masukin nama kelas kamu"
            prepend-icon="mdi-google-classroom"
            required
          ></v-text-field>
          <v-text-field
            v-model="description"
            :rules="descriptionRules"
            label="Deskripsi (opsional)"
            placeholder="Masukin deskripsi kelas kamu"
            prepend-icon="mdi-text"
          ></v-text-field>
          <p class="text-body-2 text-center my-3">
            Sekalian lengkapin data kamu yuk!
          </p>
          <v-text-field
            v-model="studentId"
            :rules="studentIdRules"
            label="NIM"
            placeholder="Masukin NIM kamu"
            prepend-icon="mdi-card-account-details-outline"
            @keydown.enter="validate"
          ></v-text-field>
          <div class="d-flex justify-center mt-4">
            <v-btn
              :loading="loading"
              variant="flat"
              color="primary"
              @click="validate"
            >
              Buat kelas
            </v-btn>
          </div>
        </v-form>
        <p class="text-body-2 text-center mt-6">
          Udah buat kelas?
          <v-btn
            class="px-1 py-0 ma-0 text-body-2"
            variant="text"
            color="blue"
            size="small"
            @click="goToJoinClassroom"
          >
            Join kelas
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
