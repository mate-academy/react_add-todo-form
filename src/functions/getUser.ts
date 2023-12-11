import { UserType } from '../types/UserType';

export function getUser(
  usersList: UserType[],
  userId: number,
): UserType | null {
  const foundUser = usersList.find(user => user.id === userId);

  return foundUser || null;
}
