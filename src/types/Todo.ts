import type { TodoFromServer } from './TodoFromServer';
import type { User } from './User';

export interface Todo extends TodoFromServer {
  user: User | null;
}
