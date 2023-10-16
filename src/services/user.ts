import { Users } from '../types/types';
import usersFromServer from '../api/users';

export const getUserById = (userId: number): Users | undefined => {
  const user = usersFromServer.find(commonUser => commonUser.id === userId);

  return user || undefined;
};
