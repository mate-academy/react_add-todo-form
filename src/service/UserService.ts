import usersFromServer from '../api/users';
import { User } from '../types/User';

const initialUsers = [...usersFromServer];

export function getAllUsers(): User[] {
  return [...initialUsers];
}

export function getUserById(userId: number): User {
  const usr: User = {
    id: 0,
    name: '',
    username: '',
    email: '',
  };

  return usersFromServer.find(user => user.id === userId) || usr;
}
