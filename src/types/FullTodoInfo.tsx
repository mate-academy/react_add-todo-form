import { Todo } from './Todo';
import { User } from './User';

export interface FullTodoInfo extends Todo {
  user: User | null;
}
