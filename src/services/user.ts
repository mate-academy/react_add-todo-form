import { User } from '../types';
import { httpClient } from '../utils/httpClient';

export function getUsers(): Promise<User[]> {
  return httpClient.get<User[]>('/users')
    .then(users => users.slice(0, 11));
}

export function getUserById(id: number): Promise<User> {
  return httpClient.get<User>(`/users/${id}`);
}
