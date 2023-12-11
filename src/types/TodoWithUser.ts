import { User } from './User';
import { Todo } from './Todo';

export interface TodoWithUser extends Todo {
  user: User | null;
}
