import usersFromServer from '../api/users';
import { User } from '../types/user';

type FindUser = (userId: number) => User;

export const findUser: FindUser = userId =>
  usersFromServer.filter(user => user.id === userId)[0];
