import usersFromServer from '../api/users';
import { getUserById } from './getUserById';
import { getMaxTodoId } from './getMaxTodoId';
import { Todo } from '../types';

export function createTodo(
  title: string,
  userId: number,
  currentList: Todo[],
) {
  return {
    id: getMaxTodoId(currentList) + 1,
    title,
    completed: false,
    userId,
    user: getUserById(userId, usersFromServer) || null,
  };
}
