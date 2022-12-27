import type { EventInput } from '@fullcalendar/core'
import { defineStore } from 'pinia'

export const useOverviewStore = defineStore('overview', {
  state() {
    return {
      upcomingTasks: <EventInput[] | undefined>undefined,
      upcomingEvents: <EventInput[] | undefined>undefined,
      loading: false,
      error: <string | null>null,
    }
  },
  actions: {
    init(currentEvents: EventInput[]) {
      this.upcomingTasks = []
      this.upcomingEvents = []

      const tasks = currentEvents.filter(
        (event) => event.extendedProps?.type === 'task'
      )
      const events = currentEvents.filter(
        (event) => event.extendedProps?.type === 'event'
      )

      this.upcomingTasks = tasks.filter((task) => {
        const start = new Date(task.start as string)
        const now = new Date()

        if (start > now) {
          return true
        }
      })
      this.upcomingEvents = events.filter((task) => {
        const start = new Date(task.start as string)
        const now = new Date()
        if (start > now) {
          return true
        } else {
          if (task.rrule) {
            // if ((task.rrule as any)['freq'] === 'weekly') {
            // }
          }
          return false
        }
      })
    },
  },
})
