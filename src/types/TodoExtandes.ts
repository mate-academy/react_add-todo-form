import { Todo } from './Todo';
import { User } from './User';

export type TodoExtanded = Todo & {
  user: User;
};
