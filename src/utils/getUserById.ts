import { User } from '../types/User';
import usersFromServer from '../api/users';

export const getUserById = (id: number): User => {
  const person: User | undefined = usersFromServer.find(user => user.id === id);

  if (!person) {
    throw new Error(`User with id ${id} not found`);
  }

  return person;
};
