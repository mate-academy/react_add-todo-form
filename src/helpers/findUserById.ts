import { IUser } from '../types/User.types';

export const getUserById = (arr: IUser[], id: number) => {
  return arr.find(el => el.id === +id) || null;
};
