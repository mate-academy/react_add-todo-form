import { User } from './User';
import { Todo } from './Todo';

export type ToDoWithUser = Todo & {
  user: User;
};
