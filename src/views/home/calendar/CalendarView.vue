<script setup lang="ts">
import { useCalendarStore } from '@/stores/home/calendar/calendar-store'
import AppCreateEventDialog from '@/views/home/calendar/components/AppCreateEventDialog.vue'
import type { Calendar } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import FullCalendar from '@fullcalendar/vue3'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import AppError from '../../../components/AppError.vue'

const { mdAndDown } = useDisplay()

const calendarRef = ref<Calendar>()

const store = useCalendarStore()
const {
  createEvent,
  getEvents,
  handleDateSelect,
  handleEventClick,
  handleEvents,
  onCloseEventPressed,
  onSaveEventPressed,
} = store
const { calendar, loading, error, currentEvents, tempEvent, eventDialog } =
  storeToRefs(store)

onMounted(() => (calendar.value = calendarRef.value))

getEvents()
</script>

<template>
  <v-main>
    <v-progress-linear v-if="loading" indeterminate></v-progress-linear>
    <app-error
      v-else-if="error"
      class="mt-4"
      :error="error"
      @refresh="getEvents"
    ></app-error>
    <v-container v-else full-height style="height: 100%">
      <div style="height: 100%">
        <full-calendar
          ref="calendarRef"
          :options="{
            height: '100%',
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridDay,timeGridWeek,dayGridMonth',
            },
            plugins: [
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              rrulePlugin,
            ],
            dayHeaderFormat: {
              weekday: 'short',
              month: 'numeric',
              day: 'numeric',
              omitCommas: true,
            },
            initialView: 'timeGridWeek',
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            weekends: true,
            // select: (dateSelectArg) => onSaveEventPressed(dateSelectArg, {}),
            eventClick: handleEventClick,
            eventsSet: handleEvents,
            events: currentEvents,
            /* you can update a remote database when these fire:
            eventAdd: (eventAdd)=>on,
        eventChange:
        eventRemove:
        */
          }"
        >
          <template v-slot:eventContent="arg">
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
          </template>
        </full-calendar>
      </div>
    </v-container>
  </v-main>
  <v-btn
    id="menu-add-activator"
    class="ma-4"
    rounded="lg"
    icon="mdi-plus"
    color="primary-container"
    position="fixed"
    @click="eventDialog = true"
    :style="{ right: 0, bottom: (mdAndDown ? 56 : 0) + 'px', 'z-index': 2 }"
  ></v-btn>
  <v-dialog
    class="ma-4 full-dialog"
    v-model="eventDialog"
    persistent
    fullscreen
  >
    <app-create-event-dialog
      :event="tempEvent"
      @close="onCloseEventPressed"
      @save="(event) => onSaveEventPressed(event)"
    ></app-create-event-dialog>
  </v-dialog>
</template>

<style lang="css"></style>
