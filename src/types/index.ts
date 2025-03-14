export interface Todo {
  id: string;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
