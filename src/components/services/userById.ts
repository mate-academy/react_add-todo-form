import usersFromServer from '../../api/users';

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}
