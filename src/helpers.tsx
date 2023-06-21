import { Todo, User, TodoWithUser } from './types/types';

export const getUserById = (
  users: User[],
  userId: number,
): User | null => (
  users.find(user => user.id === userId) || null
);

export const prepareTodos = (
  todos: Todo[],
  users: User[],
): TodoWithUser[] => (
  todos.map(todo => ({
    ...todo,
    user: getUserById(users, todo.userId),
  }))
);

export function getNewTodoId(todos: Todo[]) {
  const todoIds = todos.map(todo => todo.id);
  const maxId = Math.max(...todoIds);

  return maxId + 1;
}
