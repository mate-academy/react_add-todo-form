import { User } from '../types/User';
import { Todo } from '../types/Todo';

const API_URL = 'https://mate.academy/students-api';

async function get<T>(url: string): Promise<T> {
  const response = await fetch(API_URL + url);

  if (response.ok) {
    return response.json();
  }

  throw new Error(`Status code is ${response.status}`);
}

export const getUsers = () => get<User[]>('/users');

export function getUserById(userId: number) {
  return get<User>(`/users/${userId}`);
}

export function getTodos() {
  return get<Todo[]>('/todos');
}
