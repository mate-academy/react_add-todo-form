export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
