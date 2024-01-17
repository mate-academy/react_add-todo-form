import { Todo } from '../types/Todo';
import { User } from '../types/User';

export const getNewPostId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const getUserById = (users: User[], id: number): User | null => {
  return users.find((user) => user.id === id) || null;
};
