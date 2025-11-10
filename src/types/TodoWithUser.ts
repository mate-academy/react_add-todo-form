import { Todo } from './Todo';
import { User } from './User';

export interface TodoWithUser extends Omit<Todo, 'user'> {
  user: User;
}
