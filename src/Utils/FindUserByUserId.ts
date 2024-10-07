import { User } from '../Types/user';

export const findUserByUserId = (
  userId: number,
  userList: User[],
): User | null => {
  return userList.find((user: User) => user.id === userId) || null;
};
