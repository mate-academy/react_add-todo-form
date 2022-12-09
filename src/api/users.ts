import { client } from '../utils/fetchClient';
import { User } from '../types/User';

export const getUserByEmail = async (email: string) => {
  const users = await client.get<User[]>(`/users?email=${email}`);

  return users[0] || null;
};

type UserData = Pick<User, 'name' | 'email'>;

export const createUser = async (data: UserData) => {
  return client.post<User>('/users', data);
};
