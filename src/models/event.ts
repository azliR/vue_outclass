export interface Event {
  id: string
  creator_id: string
  classroom_id: string | null
  title: string
  start_date: Date
  end_date: Date
  repeat: string
  color: string
  description?: string | null
  last_modified: Date
  date_created: Date
}
