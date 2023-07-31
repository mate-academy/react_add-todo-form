import { User } from '../types';
import { get } from '../utils/httpClient';

export function getUsers(): Promise<User[]> {
  return get<User[]>('/users')
    .then(users => users.slice(0, 11));
}

export function getUserById(id: number): Promise<User> {
  return get<User>(`/users/${id}`);
}
