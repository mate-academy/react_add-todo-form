import { Todo } from './Todo';
import { User } from './User';

export type TodoAgregate = Todo & {
  user: User;
};

export type TodoWithoutId = Omit<TodoAgregate, 'id'>;
