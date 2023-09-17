import { Todo } from './Todo';
import { User } from './User';

export interface PreparedTodo extends Todo {
  user: User | null;
}
