import todosFromServer from '../api/todos';
import usersFromServer from '../api/users';

import { PreparedTodo } from '../types/PreparedTodo';
import { User } from '../types/User';

export function findUserByID(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function getPreparedTodos(): PreparedTodo[] {
  return todosFromServer.map(todo => ({
    ...todo,
    user: findUserByID(todo.userId),
  }));
}

export function getHighestTodoID(todos: PreparedTodo[]) {
  if (todos.length === 0) {
    return 1;
  }

  const IDs = todos.map(element => element.id);

  return Math.max(...IDs) + 1;
}
