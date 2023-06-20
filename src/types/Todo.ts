import { User } from './User';

export interface InitialTodo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

export interface Todo extends InitialTodo {
  user: User | null,
}
