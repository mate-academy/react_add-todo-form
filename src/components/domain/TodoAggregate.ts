import { Nullable } from './Nullable';
import { Todo } from './Todo';
import { User } from './User';

export type TodoAggregate = Todo & {
  user: Nullable<User>;
};
