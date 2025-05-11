import usersFromServer from '../api/users';

export const getUser = (id: number) => {
  const user = usersFromServer.find(userFS => userFS.id === id);

  if (!user) {
    return null;
  }

  return user;
};
