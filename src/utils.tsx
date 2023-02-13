import { User } from './types';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export const getUsersFromServer = (usersFromServer: User[], todo: Todo) => {
  return usersFromServer.find(user => user.id === todo.userId) || null;
};
