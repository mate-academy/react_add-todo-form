import usersFromServer from '../api/users';
import { User } from '../types/user';

export const findUserById = (id: number): User => (
  usersFromServer.find(user => user.id === id) as User
);
