import { User } from '../../types';

export function findUserById(
  userId: number,
  usersFromServer: User[],
): User | null {
  return usersFromServer.find(({ id }) => userId === id) || null;
}
