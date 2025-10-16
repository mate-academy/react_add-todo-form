import { Todo } from './Todo';
import { User } from './User';

export type TodoConfigurated = Todo & {
  user: User | null;
};
