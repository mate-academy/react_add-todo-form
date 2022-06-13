import { User } from './User';
import { Todo } from './Todo';

export interface PreparedTodo extends Todo {
  user: User | null,
}
