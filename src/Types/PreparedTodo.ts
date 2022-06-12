import { User } from '../Types/User';
import { Todo } from '../Types/Todo';

export interface PreparedTodo extends Todo {
  user: User | null;
}
