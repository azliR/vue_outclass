import type { CreateEventDto } from '@/dtos/event'
import { colors } from '@/models/directory'
import { repeatOptions as repeats } from '@/models/event'
import { defineStore } from 'pinia'

export const useCreateEventStore = defineStore('create-event', {
  state() {
    const startDate = new Date(
      Math.ceil(new Date().getTime() / 1800000) * 1800000
    )
    return {
      valid: false,
      event: <CreateEventDto>{
        repeat: repeats[0].key,
        start_date: startDate,
        end_date: new Date(startDate.getTime() + 3600000),
        color: colors.find((color) => color.key === 'grape')!.key,
      },
    }
  },
  getters: {
    colors: () => colors,
    repeats: () => repeats,
    titleRules: () => [(v: string) => !!v || 'Namanya harus diisi dong'],
    descriptionRules: () => [
      (v: string) =>
        (v?.length ?? 0) <= 255 || 'Deskripsinya jangan kepanjangan',
    ],
  },
  actions: {},
})
