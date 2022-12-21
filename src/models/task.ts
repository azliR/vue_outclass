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
