import { UserType as UT } from '../types';

export const findUserByID = (userId: number, array: UT[]): UT | null => array
  .find(({ id }) => id === userId) || null;
