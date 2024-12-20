import { User } from '../types/User';
import usersFromServer from '../../api/users';

const anonymousUser: User = {
  id: 0,
  name: 'Anonymous',
  username: 'anon',
  email: 'anonymous@unknown.com',
};

export function getUserById(id: number): User {
  return usersFromServer.find(user => user.id === id) || anonymousUser;
}
