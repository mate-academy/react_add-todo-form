import { User } from './User';
import { Todo } from './Todo';
import { Nullable } from './Nullable';

export type ToDoAggregate = Todo & {
  user: Nullable<User>;
};
