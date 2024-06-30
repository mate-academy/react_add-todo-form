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
    user: usersFromServer.find((user: User) => user.id === todo.userId) || null,
  }));
}
