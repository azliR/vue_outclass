import type { User } from './user';

export interface Classroom {
  id: string;
  name: string;
  students: User[];
}
