import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';
import { Todo } from '../types/todo';
import { User } from '../types/user';

export const getUserById = (userId: number): User | undefined => {
  return usersFromServer.find(user => user.id === userId);
};

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));
