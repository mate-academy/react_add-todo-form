import { Todo } from './TodoTypes';
import { User } from './UserTypes';

export interface TodoWithUser extends Todo {
  user: User | null
}
