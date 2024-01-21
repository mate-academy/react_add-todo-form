export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export function getUserById(array: User[], id: number): User | null {
  return array.find(user => user.id === id)
    || null;
}
