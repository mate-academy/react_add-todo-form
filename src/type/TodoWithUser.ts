import { Todo } from './Todo';
import { User } from './User';

export interface TodoWithUser extends Todo {
  user: User | null;
}
