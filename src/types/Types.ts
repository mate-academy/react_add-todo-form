export interface User {
  id: number;
  name: string;
}

export interface Todo {
  user: User | null,
  userId: number;
  id: number;
  title: string;
}
