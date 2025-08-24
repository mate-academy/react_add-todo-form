import usersFromServer from '../api/users';
import { User } from '../types/User';

export const findUserById = (id: number): User => {
  const user: User | undefined = usersFromServer.find(
    userFromServer => userFromServer.id === id,
  );

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  return user;
};
