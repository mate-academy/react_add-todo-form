import { Todo, TodoWithUser, User } from '../Types';

export const getPreparedData = (
  todosFromServer: Todo[],
  usersFromServer: User[],
): TodoWithUser[] => {
  return todosFromServer.map(todo => {
    const user = usersFromServer
      .find(currentUser => currentUser.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });
};
