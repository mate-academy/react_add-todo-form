import { Todo } from './Todo';
import { User } from './User';

export interface Post extends Todo {
  user: User | null;
}
