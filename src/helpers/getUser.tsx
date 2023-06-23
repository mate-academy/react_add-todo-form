import usersFromServer from '../api/users';

export const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => (
    userId === user.id
  ));

  return foundUser || null;
};
