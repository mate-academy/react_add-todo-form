import { Todo } from './Todos';
import { User } from './Users';

export interface UsersAndTodos extends Todo {
  user: User;
}
