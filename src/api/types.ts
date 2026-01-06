import type { Todo as ApiTodo } from './api/todos';
import type { User } from './users';

export type TodoWithUser = ApiTodo & {
  user: User;
};
