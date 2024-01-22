import usersFromServer from '../../api/users';
import { User } from '../Types/User';

export const getUserById = (id: number) => {
  return usersFromServer.find((user: User) => user.id === id);
};
