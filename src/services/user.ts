import users from '../api/users';
import { User } from '../types/User';

export function getUserById(userId: number): User | null {
  const todowithUser = users.find(user => {
    return user.id === userId;
  });

  return todowithUser || null;
}
