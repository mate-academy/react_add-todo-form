export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}
