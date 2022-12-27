import type { EventInput } from '@fullcalendar/core'
import { getFolderColor } from './directory'

export interface Event {
  id: string
  creator_id: string
  classroom_id: string | null
  title: string
  start_date: Date
  end_date: Date
  repeat: string
  color: string
  description: string | null
  last_modified: Date
  date_created: Date
}

export function toEventInputCalendar(event: Event) {
  return {
    id: event.id,
    title: event.title,
    start: event.start_date,
    end: event.end_date,
    allDay: event.end_date === null,
    groupId: event.id,
    extendedProps: {
      type: 'event',
    },
    color: getFolderColor(event.color),
    rrule:
      event.repeat && event.repeat != 'none'
        ? {
            freq: event.repeat,
            dtstart: event.start_date,
          }
        : null,
  } as EventInput
}

export const repeatOptions = [
  { key: 'none', label: 'Tidak berulang' },
  { key: 'daily', label: 'Setiap hari' },
  { key: 'weekly', label: 'Setiap pekan' },
  { key: 'monthly', label: 'Setiap bulan' },
  { key: 'yearly', label: 'Setiap tahun' },
]
