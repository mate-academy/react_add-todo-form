import { Todo } from './Todo';
import { User } from './User';

export interface FullTodo extends Todo {
  user: User | null;
}
