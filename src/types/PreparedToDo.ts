import { User } from './User';

export interface PreparedToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
