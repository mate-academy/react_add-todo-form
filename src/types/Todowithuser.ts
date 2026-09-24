import { User } from './Users';
import { Todo } from './Todo';

export interface Todowithuser extends Todo {
  user: User | null;
}
