export default interface Assignment {
  id: string;
  classroomId: string;
  name: string;
  description?: string | null;
  deadline: Date;
}
