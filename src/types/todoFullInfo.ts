import { Todo } from './todo';
import { User } from './user';

export interface TodoFullInfo extends Todo {
  user: User | null,
}
