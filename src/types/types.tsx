import usersFromServer from '../api/users';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoInterface {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export function getUsersById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export function getMaxVal(numbers: number[]): number {
  return Math.max(...numbers) + 1;
}
