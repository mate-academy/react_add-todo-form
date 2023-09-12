export interface Todo {
  id: number;
  title: string;
  user: User;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
