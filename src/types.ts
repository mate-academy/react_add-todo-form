export interface User {
  name: string;
  email: string;
  id: number;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
