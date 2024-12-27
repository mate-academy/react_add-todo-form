import { User } from '../types/User';
import usersFromServer from '../../api/users';

const anonymousUser: User = {
  id: 0,
  name: 'Anonymous',
  username: 'anon',
  email: 'anonymous@unknown.com',
};

export function getUserById(id: number): User | undefined {
  const foundUser = usersFromServer.find(u => u.id === id);
  /* eslint-disable no-console */

  console.warn(`User with ID ${id} not found. Returning anonymous user.`);
  /* eslint-enable no-console */

  return foundUser || anonymousUser;
}
