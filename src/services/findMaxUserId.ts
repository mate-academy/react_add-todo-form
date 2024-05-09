import User from '../types/User';

export default function findMaxUserId(users: User[]): number {
  return users.reduce((acc, { id }) => Math.max(acc, id), 0);
}
