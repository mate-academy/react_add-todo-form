import { Nullable } from './Nullable';
import { Todo } from './Todo';
import { User } from './User';

export type TodoAggregated = Todo & {
  user: Nullable<User>;
};

export const getAggregateTodos = (
  todos: Todo[],
  users: User[],
): TodoAggregated[] => {
  return todos.map(todo => {
    const user = users.find(({ id }) => id === todo.userId) ?? null;

    return {
      ...todo,
      user,
    } satisfies TodoAggregated;
  });
};
