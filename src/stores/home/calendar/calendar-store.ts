import { getFolderColor } from '@/models/directory'
import type { Event } from '@/models/event'
import type { ResponseData } from '@/models/response-data'
import type { Task } from '@/models/task'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import type {
  DateSelectArg,
  EventAddArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state() {
    return {
      error: <string | null>null,
      errorSnackbar: <string | null>null,
      loading: false,
      currentEvents: <EventInput[]>[{}],
    }
  },
  actions: {
    async createEvent(eventAdd: EventAddArg) {
      this.errorSnackbar = null

      const event = eventAdd.event
      const classroomId = localStorage.getItem(DEFAULT_CLASSROOM_ID_PREF_KEY)

      await this.privateClient
        .post<ResponseData<Event>>('/directories/folders', {
          classroom_id: classroomId,
          name: event.title,
          start_date: event.start,
          end_date: event.end,
        })
        .then(({ data }) => {
          if (data.success) {
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('calendar-store.ts -> createEvent', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.errorSnackbar = error.response?.data?.message ?? ''
            } else {
              this.errorSnackbar = JSON.stringify(error.toJSON())
            }
          } else {
            this.errorSnackbar = error.message
          }
        })
    },
    async getEvents() {
      this.error = null
      this.loading = true

      const classroomId = localStorage.getItem(DEFAULT_CLASSROOM_ID_PREF_KEY)
      if (!classroomId) {
        this.router.push({ name: 'in' })
        return
      }

      await this.privateClient
        .get<ResponseData<Event[]>>('/events/class/' + classroomId)
        .then(({ data }) => {
          this.loading = false
          if (data.data && data.success) {
            this.error = null
            console.log(data)

            const newEvents = data.data.map((event) => {
              return {
                id: event.id,
                title: event.title,
                start: event.start_date,
                end: event.end_date,
                allDay: event.end_date === null,
                groupId: event.id,
                color: getFolderColor(event.color),
                rrule: {
                  freq: event.repeat,
                  dtstart: event.start_date,
                },
              }
            }) as EventInput[]

            this.currentEvents.push(...newEvents)
            this.getTasks()
            console.log(this.currentEvents)
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('calendar-store.ts -> getEvents', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.error = error.response?.data?.message ?? ''
            } else {
              this.error = JSON.stringify(error.toJSON())
            }
          } else {
            this.error = error.message
          }
        })
    },
    async getTasks() {
      this.error = null
      this.loading = true

      const classroomId = localStorage.getItem(DEFAULT_CLASSROOM_ID_PREF_KEY)
      if (!classroomId) {
        this.router.push({ name: 'in' })
        return
      }

      await this.privateClient
        .get<ResponseData<Task[]>>('/tasks/class/' + classroomId)
        .then(({ data }) => {
          this.loading = false
          if (data.data && data.success) {
            this.error = null
            console.log(data)

            const newTasks = data.data.map((task) => {
              return {
                id: task.id,
                title: task.title,
                start: task.date,
                groupId: task.id,
                extendedProps: {},
                color: getFolderColor(task.color),
                rrule: {
                  freq: task.repeat,
                  dtstart: task.date,
                },
              }
            }) as EventInput[]

            this.currentEvents.push(...newTasks)
            console.log(this.currentEvents)
          } else {
            return Promise.reject(data.message)
          }
        })
        .catch((error: Error) => {
          console.error('calendar-store.ts -> getTasks', error)

          if (error instanceof AxiosError) {
            if (error.response) {
              this.error = error.response?.data?.message ?? ''
            } else {
              this.error = JSON.stringify(error.toJSON())
            }
          } else {
            this.error = error.message
          }
        })
    },
    handleDateSelect(selectInfo: DateSelectArg) {
      const title = prompt('Please enter a new title for your event')
      const calendarApi = selectInfo.view.calendar

      calendarApi.unselect()

      if (title) {
        calendarApi.addEvent({
          id: '1',
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        })
      }
    },
    handleEventClick(clickInfo: EventClickArg) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events: EventApi[]) {
      // this.currentEvents = events.map((event: Event) => {});
    },
  },
})
