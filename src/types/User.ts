export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export function getUserById(array: User[], id: number): User | undefined {
  return array.find(user => user.id === id);
}
