import { Todo } from './Todo';
import { User } from './user';

export interface TodoWithUser extends Todo {
  user: User | null;
}
