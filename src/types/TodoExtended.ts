import { Todo } from './Todo';
import { User } from './User';

export type TodoExtended = Todo & {
  user: User;
};
