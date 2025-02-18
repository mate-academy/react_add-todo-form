import { User } from '../Types';
import usersFromServer from '../api/users';

export const getUserById = (id: number): User | null =>
  usersFromServer.find(user => id === user.id) || null;
