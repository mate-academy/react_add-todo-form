import { Todo } from './Todo';
import { User } from './User';

export type TodoWithUser = Todo & {
  user: User | null;
};
