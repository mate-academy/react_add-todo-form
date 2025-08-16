import { User } from './User';

export type UserWithTodos = {
  todoId: number;
  user: User;
  title: string;
  completed: boolean;
};
