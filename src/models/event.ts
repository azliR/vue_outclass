export interface Event {
  id: string
  classroomId: string
  name: string
  description?: string | null
  date: Date
  endDate: Date
}
