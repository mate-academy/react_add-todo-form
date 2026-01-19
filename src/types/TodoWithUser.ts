import { User } from './User';
import { Todo } from './Todo';

export type TodoWithUser = Todo & {
  user?: User;
};
