import { usersFromServer } from '../api';

export const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser;
};
