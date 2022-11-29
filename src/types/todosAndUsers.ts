import { Todo } from './todo';
import { User } from './user';

export interface TodosAndUsers extends Todo {
  user: User | null
}
