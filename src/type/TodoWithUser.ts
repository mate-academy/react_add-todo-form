import { Todo } from './Todo';
import { User } from './User';

export interface TodoWithuser extends Todo {
  user: User | null;
}
