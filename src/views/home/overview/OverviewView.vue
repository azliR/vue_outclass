<script setup lang="ts">
import { formatDate } from '@/plugins/utils'
import { useOverviewStore } from '@/stores/home/overview/overview'
import { storeToRefs } from 'pinia'

const store = useOverviewStore()
// const { formatDate } = store;
const { deadlineAssignments, upcomingEvents } = storeToRefs(store)
</script>

<template>
  <v-app-bar density="prominent">
    <v-app-bar-title>Beranda</v-app-bar-title>
  </v-app-bar>
  <v-main scrollable>
    <v-container class="d-flex flex-column flex-md-row">
      <v-sheet style="flex: 1">
        <p class="text-h6 px-6 pt-4">Deadline tugas</p>
        <v-list lines="two">
          <v-list-item
            class="px-6"
            v-for="assignment in deadlineAssignments"
            :key="assignment.id"
            :title="assignment.name"
            :subtitle="assignment.description ?? 'Tidak ada deskripsi'"
            lines="two"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon> mdi-clipboard-text </v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <p class="text-body-2">
                {{ formatDate(assignment.deadline, 'DD MMM') }}
              </p>
            </template>
          </v-list-item>
        </v-list>
      </v-sheet>
      <div class="ma-2"></div>
      <v-sheet style="flex: 1">
        <p class="text-h6 px-6 pt-4">Acara mendatang</p>
        <v-list lines="two">
          <v-list-item
            class="px-6"
            v-for="event in upcomingEvents"
            :key="event.id"
            :title="event.title"
            :subtitle="event.description ?? 'Tidak ada deskripsi'"
          >
            <template v-slot:prepend>
              <v-avatar>
                <v-icon> mdi-calendar </v-icon>
              </v-avatar>
            </template>
            <template v-slot:append>
              <p class="text-body-2">
                {{ formatDate(event.date, 'DD MMM') }}
              </p>
            </template>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-container>
  </v-main>
</template>
