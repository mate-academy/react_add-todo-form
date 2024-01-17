import usersFromServer from '../../api/users';

export const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};
