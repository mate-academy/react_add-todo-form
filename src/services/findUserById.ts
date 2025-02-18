import User from '../types/User';

export default function findUserById(users: User[], id: number): User | null {
  return users.find(user => id === user.id) || null;
}
