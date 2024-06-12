export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
