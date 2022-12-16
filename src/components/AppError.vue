<script setup lang="ts">
const emit = defineEmits(['refresh'])

defineProps({
  error: { type: String, required: true },
})

function onRefreshPressed() {
  emit('refresh')
}
</script>

<template>
  <v-sheet class="mx-auto" max-width="504px">
    <v-expansion-panels>
      <v-container>
        <p class="text-h6 text-center">Terjadi error!</p>
        <p class="text-body-2 text-center mt-1">
          Ada kesalahan nih pas lagi nyambungin ke server, coba lagi aja yah!
        </p>
      </v-container>
      <div class="d-flex justify-space-around mb-4">
        <v-btn
          class="mx-auto"
          variant="tonal"
          prepend-icon="mdi-refresh"
          @click="onRefreshPressed"
        >
          Coba lagi
        </v-btn>
      </div>
      <v-expansion-panel>
        <v-expansion-panel-title> Log error: </v-expansion-panel-title>
        <v-expansion-panel-text class="text-body-2">
          <code>{{ error }}</code>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-sheet>
</template>
