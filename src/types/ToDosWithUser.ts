import { Todo } from './Todo';
import { User } from './User';

export interface TodosWithUser extends Todo {
  user: User | null;
}
