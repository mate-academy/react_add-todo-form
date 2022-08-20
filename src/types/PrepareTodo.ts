import { Todo } from './Todo';
import { User } from './User';

export interface PrepareTodo extends Todo {
  user: User | undefined,
}
