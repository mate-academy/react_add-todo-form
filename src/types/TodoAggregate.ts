import { Todo } from './Todo';
import { User } from './User';

export type TodoAggregate = Todo & {
  user: User;
};

export const createTodoAggregate = (
  todos: Todo[],
  users: User[],
): TodoAggregate[] => {
  return todos.map(todo => {
    const user = users.find(({ id }) => id === todo.userId)!;

    const TodoAggregate: TodoAggregate = {
      ...todo,
      user,
    };

    return TodoAggregate;
  });
};
