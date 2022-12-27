import type { EventInput } from '@fullcalendar/core'
import { getFolderColor } from './directory'

export interface Task {
  id: string
  creator_id: string
  classroom_id: string | null
  title: string
  details?: string | null
  date: Date
  repeat: string
  color: string
  files: File[]
  last_modified: Date
  date_created: Date
}

export function toTaskInputCalendar(task: Task) {
  return {
    id: task.id,
    title: task.title,
    start: task.date,
    groupId: task.id,
    color: getFolderColor(task.color),
    extendedProps: {
      type: 'task',
    },
    rrule:
      task.repeat && task.repeat != 'none'
        ? {
            freq: task.repeat,
            dtstart: task.date,
          }
        : null,
  } as EventInput
}
