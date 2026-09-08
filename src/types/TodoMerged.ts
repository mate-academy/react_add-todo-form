import { Todo } from './Todo';
import { User } from './User';

export type TodoMerged = Todo & {
  user: User | undefined;
};
