import { User } from './user';
import { Todo } from './todo';

export interface PreparedTodo extends Todo {
  user: User
}
