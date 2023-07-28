import { Todo, User } from '../types';

const API_URL = 'https://mate.academy/students-api';

async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(API_URL + endpoint);

  console.log(response.headers.get('Content-Type'));

  if (!response.ok) {
    throw new Error(`Can't load from '${endpoint}'`);
  }

  return response.json();
}

export function getUsers(): Promise<User[]> {
  return get<User[]>('/users')
    .then(users => users.slice(0, 11));
}

export function getUserById(id: number): Promise<User> {
  return get<User>(`/users/${id}`);
}

export function getTodos() {
  return get<Todo[]>('/todos?userId=11');
}
