import usersFromServer from '../api/users';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
export function getUserById(userId: number): User {
  const user = usersFromServer.find(user1 => user1.id === userId);

  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  return user;
}
