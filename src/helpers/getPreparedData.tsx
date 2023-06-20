import { Todo, TodoWithUser, User } from '../Types';
import { getUser } from './getUser';

export const getPreparedData = (
  todosFromServer: Todo[],
  usersFromServer: User[],
): TodoWithUser[] => {
  return todosFromServer.map(todo => {
    const user = getUser(todo.userId, usersFromServer);

    return {
      ...todo,
      user,
    };
  });
};
