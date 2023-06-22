import { Todo, InitialTodo } from './types/Todo';
import { User } from './types/User';

export function findUserById(users: User[], userId: number): User | null {
  const foundUser = users.find(user => user.id === userId);

  return foundUser || null;
}

export function getCurrentTodos(todos: InitialTodo[], users: User[]): Todo[] {
  return todos.map(todo => ({
    ...todo,
    user: findUserById(users, todo.userId),
  }));
}

export const getNewId = (arr: { id: number }[]): number => {
  const ids = arr.map((item) => item.id);
  const maxId = Math.max(...ids);

  return Number.isFinite(maxId)
    ? maxId + 1
    : 1;
};
