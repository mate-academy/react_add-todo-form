export interface User {
  id: number
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  userId: number;
  id: number | string;
  title: string;
  user?: User | null;
  completed?: boolean;
}
