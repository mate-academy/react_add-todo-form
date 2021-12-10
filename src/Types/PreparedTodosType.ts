import { UserType } from './UserType';
import { Todo } from './TodoType';

export type PreparedUser = UserType | null;

export type PreparedTodoType = Todo & {
  user: PreparedUser;
};
