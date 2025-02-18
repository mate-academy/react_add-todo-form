import { User } from '../Types/user';

export const findUserByUserId = (
  userId: number,
  users: User[],
): User | null => {
  return users.find((user: User) => user.id === userId) || null;
};
