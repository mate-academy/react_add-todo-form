import { Todo } from './Todo';
import { User } from './User';

export interface PreparedTodo {
  todo: Todo
  user: User | null
}
