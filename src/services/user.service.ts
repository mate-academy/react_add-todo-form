import { User } from '../models/User';
import usersFromServer from '../api/users';
import { Todo } from '../models/Todo';

export const getUserById = (userId: number):User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

export function getNewTodoId(todos: Todo[]): number {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}
