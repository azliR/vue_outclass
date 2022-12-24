export interface CreateEventDto {
  classroom_id: string | null
  title: string
  start_date: Date
  end_date: Date
  repeat: string
  color: string
  description: string | null
}
