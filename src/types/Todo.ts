import { User } from './User';

export interface Task {
  id: number,
  userId: number,
  title: string,
  completed:boolean,
}

export interface TasksWithTodo extends Task {
  user: User | null;
}
