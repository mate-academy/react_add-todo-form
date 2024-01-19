import usersFromServer from '../../api/users';
import { User } from '../Types/User'; // Assuming there is a 'User' type defined in './types'

export const getUserById = (id: number) => {
  return usersFromServer.find((user: User) => user.id === id);
};
