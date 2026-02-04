import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export type TodoDraft = Omit<Todo, 'id' | 'user'>;
