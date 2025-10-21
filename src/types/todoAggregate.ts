import { Nullable } from './nullable-type';
import { Todo } from './todo';
import { User } from './user';

export type TodoAggregate = Todo & {
  user: Nullable<User>;
};
