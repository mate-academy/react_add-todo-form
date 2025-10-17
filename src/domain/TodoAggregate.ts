import { Nullable } from './Nullable';
import { Todo } from './Todo';
import { User } from './User';

export type TodoAggregate = Todo & {
  user: Nullable<User>;
};

export const createTodoAggregates = (
  todos: Todo[],
  users: User[],
): TodoAggregate[] => {
  return todos.map(todo => {
    const user = users.find(({ id }) => id === todo.userId) ?? null;

    return {
      ...todo,
      user,
    } satisfies TodoAggregate;
  });
};
