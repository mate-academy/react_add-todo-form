import { Todo, TodoWithUser, User } from './types/types';

export const getUserById = (
  users: User[],
  id: number,
): User | null => (
  users.find(user => user.id === id) || null
);

export const getTodosWithUsers = (
  todos: Todo[],
  users: User[],
): TodoWithUser[] => {
  return todos.filter(todo => todo.userId)
    .map(todo => ({
      ...todo,
      user: getUserById(users, todo.userId)!,
    }));
};

export const getNewId = (arr: { id: number }[]): number => {
  const ids = arr.map(el => el.id);
  const maxId = Math.max(...ids);

  if (!Number.isFinite(maxId)) {
    return 1;
  }

  return maxId + 1;
};
