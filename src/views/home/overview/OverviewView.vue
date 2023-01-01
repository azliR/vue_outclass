<script setup lang="ts">
import AppEmpty from '@/components/AppEmpty.vue'
import AppError from '@/components/AppError.vue'
import { formatDate } from '@/plugins/utils'
import { useCalendarStore } from '@/stores/home/calendar/calendar-store'
import { useOverviewStore } from '@/stores/home/overview/overview-store'
import { storeToRefs } from 'pinia'

const store = useOverviewStore()
const { init } = store
const { upcomingTasks, upcomingEvents, loading, error } = storeToRefs(store)

const calendarStore = useCalendarStore()
const {
  currentEvents,
  loading: calendarLoading,
  error: calendarError,
} = storeToRefs(calendarStore)

if (upcomingTasks.value === undefined || upcomingEvents.value === undefined) {
  if (currentEvents.value === undefined) {
    calendarStore.getEvents().then(() => init(currentEvents.value!))
  } else {
    init(currentEvents.value)
  }
}
</script>

<template>
  <v-app-bar density="prominent">
    <v-app-bar-title>Beranda</v-app-bar-title>
  </v-app-bar>
  <v-main scrollable>
    <div v-if="loading || calendarLoading" class="d-flex justify-center">
      <v-progress-circular class="ma-3" indeterminate></v-progress-circular>
    </div>
    <app-error
      v-else-if="error || calendarError"
      class="mt-4"
      :error="(error || calendarError) ?? ''"
      @refresh="error ? init(currentEvents!) : calendarStore.getEvents()"
    ></app-error>
    <v-container class="d-flex flex-column flex-md-row">
      <v-sheet v-if="upcomingTasks && upcomingTasks.length > 0" style="flex: 1">
        <p class="text-h6 px-6 pt-4">Deadline tugas</p>
        <v-list lines="two">
          <v-list-item
            class="px-6"
            v-for="assignment in upcomingTasks"
            :key="assignment.id"
            :title="assignment.title"
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
      <v-sheet
        v-if="upcomingEvents && upcomingEvents.length > 0"
        style="flex: 1"
      >
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
                {{ formatDate(event.start as Date, 'DD MMM') }}
              </p>
            </template>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-container>
    <app-empty
      v-if="
        upcomingTasks &&
        upcomingEvents &&
        upcomingTasks.length === 0 &&
        upcomingEvents.length === 0
      "
    >
    </app-empty>
  </v-main>
</template>
