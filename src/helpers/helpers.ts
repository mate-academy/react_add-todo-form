import { Todo } from '../types/Todo';
import { User } from '../types/User';
import usersFromServer from '../api/users';
import todosFromServer from '../api/todos';

export function getUser(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const getTodoNewId = (todosArray: Todo[]) => {
  const newId = Math.max(...todosArray.map(todo => todo.id));

  return newId + 1;
};
