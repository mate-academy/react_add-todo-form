import { User } from './User';
import { Todo } from './Todo';

export interface FullTodo extends Todo {
  user?: User;
}
