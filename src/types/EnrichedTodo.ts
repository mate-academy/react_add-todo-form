import { User } from './User';
import { Todo } from './Todo';

export type EnrichedTodo = Todo & {
  user: User | null;
};
