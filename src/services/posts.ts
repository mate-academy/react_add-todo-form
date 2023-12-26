import usersFromServer from '../api/users';

export const getUserByTodo = (userId: number) => {
  return usersFromServer.find(user => user.id === userId);
};
