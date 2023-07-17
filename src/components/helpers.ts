import { UserType } from "../types/UserType";
import usersFromServer from '../api/users';
import { TodoType } from "../types/TodoType";

export const getUser = (userId: number): UserType => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  if (!foundUser) {
    throw new Error('User was not found');
  }

  return foundUser;
};

export function getNewId(todos: TodoType[]) {
  const todoIds = todos.map((todo) => todo.id);
  return Math.max(...todoIds) + 1;
}
