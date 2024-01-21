import { Todo } from '../types/Todo';
import { User } from '../types/User';

export const findUser = (id: number, usersFromServer: User[]) => {
  return usersFromServer.find(user => user.id === id) as User;
};

export const getId = (visibleTodos: Todo[]): number => {
  return Math.max(...visibleTodos.map(todo => todo.id));
};
