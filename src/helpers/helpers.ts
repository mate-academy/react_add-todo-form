import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

import { Todo } from '../types/Todo';

export function getUser(userId: number) {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

export function getTodoId(todos: Todo[]): number {
  return Math.max(...todos.map(({ id }) => id)) + 1;
}

export const todoList: Todo[] = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});
