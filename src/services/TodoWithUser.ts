import { User } from './User';
import { Todo } from './Todo';

export type TodoWithUser = {
  todo: Todo;
  user?: User;
};
