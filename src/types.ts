export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
