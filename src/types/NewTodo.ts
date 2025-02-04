import { Todo } from './Todo';
import { User } from './User';

export interface NewTodo extends Todo {
  user?: User;
}
