import { TodoWithoutUser } from './TodoWithoutUser';
import { User } from './User';

export interface Todo extends TodoWithoutUser {
  user: User | null;
}
