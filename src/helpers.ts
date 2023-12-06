import { Todo, TodoWithUser, User } from './types/interfaces';

const getUserById = (users: User[], id: number): User | null => (
  users.find((user) => user.id === id) || null
);

export const getTodosWithUsers = (
  todos: Todo[],
  users: User[],
): TodoWithUser[] => (
  todos.map(todo => ({
    ...todo,
    user: getUserById(users, todo.userId),
  }))
);

export const getNewId = (todos: Todo[]): number => {
  if (!todos.length) {
    return 1;
  }

  const todosIndex = todos.map(todo => todo.id);
  const maxTodosIndex = Math.max(...todosIndex);

  return maxTodosIndex + 1;
};
