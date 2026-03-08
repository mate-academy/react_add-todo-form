import { Todo } from './todo';
import { User } from './user';

export interface Todos extends Todo {
  user: User | undefined;
}
