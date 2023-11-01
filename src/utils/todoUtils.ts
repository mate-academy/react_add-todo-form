import { Todo } from '../types/todo';
import { User } from '../types/user';

export const getNewPostId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const getUserById = (users: User[], id: number): User | null => {
  return users.find((user) => user.id === id) || null;
};
