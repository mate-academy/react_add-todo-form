import { TodoType } from '../types/TodoType';
import { UserType } from '../types/UserType';
import usersFromServer from '../api/users';

export function getUserById(userId: number): UserType | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const getNewTodoId = (newTodos: TodoType[]): number => {
  const maxId = Math.max(...newTodos.map((todo: TodoType) => todo.id));

  return maxId + 1;
};
