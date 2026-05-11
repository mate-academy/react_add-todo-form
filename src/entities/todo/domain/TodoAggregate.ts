import { User } from '../../user/domain/User';
import { Todo } from './Todo';

export type TodoAggregate = Todo & {
  user: User;
};

function getTodoAggregates(todos: Todo[], users: User[]): TodoAggregate[] {
  return todos.map(todo => {
    const foundUser = users.find(user => user.id === todo.userId) ?? null;

    if (!foundUser) {
      throw new Error(`Missing user in todo: ${todo.id}`);
    }

    return {
      ...todo,
      user: foundUser,
    };
  });
}

export const todoAggregate = {
  getTodoAggregates,
};
