import usersFromServer from '../api/users';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
      || null;
}
