import { Todo } from './Todo';
import { User } from './User';

export type TodoUnified = Todo & {
  user: User | null;
};
