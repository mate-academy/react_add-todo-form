import { User } from './react-app-env';

export function findUser(userId: number, users: User[]) {
  return users.find(user => user.id === userId) || null;
}
