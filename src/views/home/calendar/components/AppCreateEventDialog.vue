<script setup lang="ts">
import type { CreateEventDto } from '@/dtos/event'
import type { Event } from '@/models/event'
import { useCreateEventStore } from '@/stores/home/calendar/create-event-store'
import { isDark } from '@/utils/colors'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { storeToRefs } from 'pinia'
import { ref, type PropType } from 'vue'
import type { VForm } from 'vuetify/lib/components/VForm/index'
import { useTheme } from 'vuetify/lib/framework.mjs'

const props = defineProps({
  event: Object as PropType<Event | null>,
})

const emit = defineEmits({
  close: () => true,
  save: (event: CreateEventDto) => true,
})

const theme = useTheme()

const store = useCreateEventStore()
const { colors, titleRules, descriptionRules, repeats: repeats } = store
const { valid, event } = storeToRefs(store)

if (props.event) {
  event.value = ref(props.event).value
}

const form = ref<VForm>()

function onClosePressed() {
  emit('close')
  store.$reset()
}
async function onSavePressed() {
  const { valid } = await form.value!.validate()

  if (valid) {
    emit('save', event.value)
    store.$reset()
  }
}
</script>

<template>
  <v-card>
    <v-toolbar>
      <v-btn icon="mdi-close" @click="onClosePressed" variant="flat"> </v-btn>
      <v-toolbar-title>{{
        props.event ? 'Edit Event' : 'Buat Event Baru'
      }}</v-toolbar-title>
      <v-toolbar-items variant="elevated" color="primary">
        <v-btn class="ma-2" height="40" elevation="0" @click="onSavePressed">
          Simpan
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="event.title"
          :rules="titleRules"
          label="Nama event"
          placeholder="Masukin nama buat event kamu"
          prepend-icon="mdi-format-title"
          required
        ></v-text-field>
        <v-textarea
          v-model="event.description"
          :rules="descriptionRules"
          label="Description"
          placeholder="Masukin deskripsinya"
          counter="255"
          prepend-icon="mdi-text"
        ></v-textarea>
        <p class="ml-10 mb-2 text-subtitle-2">Mulai acara</p>
        <datepicker
          v-model="event.start_date"
          class="ml-9 mb-5"
          :dark="theme.current.value.dark"
        ></datepicker>
        <p class="ml-10 mb-2 text-subtitle-2">Akhir acara</p>
        <datepicker
          v-model="event.end_date"
          class="ml-9 mb-5"
          :dark="theme.current.value.dark"
        ></datepicker>
        <v-defaults-provider :defaults="{}" reset="">
          <v-select
            v-model="event.repeat"
            :items="repeats"
            item-title="label"
            item-value="key"
            prepend-icon="mdi-repeat"
          >
            <template v-slot:item="{ item }">
              <v-list-item
                :title="item.title"
                color="primary"
                variant="flat"
                @click.stop="event.repeat = item"
              >
              </v-list-item>
            </template>
          </v-select>
        </v-defaults-provider>
        <p class="ml-10 mb-2 text-subtitle-2">Warna event</p>
        <div class="ml-9 mb-5">
          <v-tooltip
            v-for="color in colors"
            :key="color.key"
            :text="color.name"
            location="top"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="ma-1"
                :color="color.color"
                rounded="lg"
                size="small"
                @click="event.color = color.key"
                icon
              >
                <v-icon
                  v-if="event.color === color.key"
                  :color="isDark(color.color) ? 'white' : 'black'"
                >
                  mdi-check-bold
                </v-icon>
              </v-btn>
            </template>
          </v-tooltip>
        </div>
      </v-form>
    </v-container>
  </v-card>
</template>
