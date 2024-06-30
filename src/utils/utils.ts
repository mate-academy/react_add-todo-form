import { Todo, User } from '../types/types';
import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { Todos } from '../types/types';

export function getNewTodoId(todos: Todo[]): number {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export function getTodosWithUserInfo(): Todo[] {
  return todosFromServer.map((todo: Todos) => ({
    ...todo,
    user: usersFromServer.find((user: User) => user.id === todo.userId) || {
      id: -1,
      name: 'Unknown',
      username: 'unknown',
      email: 'unknown@example.com',
    },
  }));
}
