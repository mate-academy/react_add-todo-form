import usersFromServer from '../api/users';
import { User } from '../types/User';
import { TodoCard } from '../types/TodoCard';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function getNewTodoId(todos: TodoCard[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
