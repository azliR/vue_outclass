<script setup lang="ts">
import { useCalendarStore } from '@/stores/home/calendar/calendar';
import '@fullcalendar/core/vdom';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import FullCalendar from '@fullcalendar/vue3';
import { storeToRefs } from 'pinia';
import AppError from '../../../components/AppError.vue';

const store = useCalendarStore();
const { getEvents, handleDateSelect, handleEventClick, handleEvents } = store;
const { loading, error, currentEvents } = storeToRefs(store);

getEvents();
</script>

<template>
  <v-app-bar title="Calendar"> </v-app-bar>
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
          class="demo-app-calendar"
          :options="{
            // height: '100%',
            headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            },
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
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
            select: handleDateSelect,
            eventClick: handleEventClick,
            eventsSet: handleEvents,
            events: currentEvents,
            /* you can update a remote database when these fire:
        eventAdd:
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
</template>

<style lang="css"></style>
