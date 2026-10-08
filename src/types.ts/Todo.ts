import { User } from './User';
import { TodoFromServer } from './TodoFromServer';

export type Todo = TodoFromServer & {
  user: User | null;
};
