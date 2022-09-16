import { User } from './types/User';

export const getUser = (users: User[], userId: number) => (
  users.find(user => user.id === userId)
);
