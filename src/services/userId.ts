import { User } from '../types/User';
import usersFromServer from '../api/users';
import { TodoWithUser } from '../types/TodoWithUser';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function getNewTodoId(todos: TodoWithUser[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
