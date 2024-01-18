import { Todo } from './Todo';
import { User } from './Users';

export interface TodoWithUser extends Todo{
  user: User | null,
}
