import { Todo } from './Todo';
import { User } from './User';

export interface ExpandedTodo extends Todo {
  userRef: User | null;
}
