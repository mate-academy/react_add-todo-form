import { Todo, User } from '../Types';

export const getPreparedData = (
  todosFromServer: Todo[],
  usersFromServer: User[],
) => {
  return todosFromServer.map(todo => {
    const user = usersFromServer
      .find(currentUser => currentUser.id === todo.userId);

    return {
      ...todo,
      user,
    };
  });
};
