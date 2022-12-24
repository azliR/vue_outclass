import type { CreateEventDto } from '@/dtos/event'
import { getFolderColor } from '@/models/directory'
import { toEventInputCalendar, type Event } from '@/models/event'
import type { ResponseData } from '@/models/response-data'
import type { Task } from '@/models/task'
import { DEFAULT_CLASSROOM_ID_PREF_KEY } from '@/plugins/constants'
import type {
  Calendar,
  DateSelectArg,
  EventApi,
  EventClickArg,
  EventInput,
} from '@fullcalendar/core'
import { AxiosError } from 'axios'
import { defineStore } from 'pinia'

export const useCalendarStore = defineStore('calendar', {
  state() {
    return {
      calendar: <Calendar | undefined>undefined,
      error: <string | null>null,
      errorSnackbar: <string | null>null,
      loading: false,
      currentEvents: <EventInput[]>[{}],
      tempEvent: <Event | null>null,
      eventDialog: false,
    }
  },
  actions: {
    async createEvent(event: CreateEventDto): Promise<Event | null> {
      this.errorSnackbar = null

      const classroomId = localStorage.getItem(DEFAULT_CLASSROOM_ID_PREF_KEY)
      event.classroom_id = classroomId

      return await this.privateClient
        .post<ResponseData<Event>>('/events', event)
        .then(({ data }) => {
          if (data.success && data.data) {
            return data.data
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
          return null
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

            const newEvents = data.data.map((event) =>
              toEventInputCalendar(event)
            ) as EventInput[]

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
    onCloseEventPressed() {
      this.eventDialog = false
      this.tempEvent = null
    },
    async onSaveEventPressed(event: CreateEventDto) {
      this.eventDialog = false

      const result = await this.createEvent(event)

      if (result) {
        this.currentEvents = []
        await this.getEvents()
      }
      this.tempEvent = null
    },
    handleDateSelect(selectInfo: DateSelectArg) {
      const title = prompt('Please enter a new title for your event')
      const calendarApi = selectInfo.view.calendar

      calendarApi.unselect()

      if (title) {
        // calendarApi.addEvent(toEventInputCalendar(event))
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
