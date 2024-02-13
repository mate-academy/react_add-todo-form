import { User } from '../types';

export function getUserById(idOfUser: number, listOfUsers: User[]) {
  return listOfUsers.find(user => user.id === idOfUser) || null;
}
