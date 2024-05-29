export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoWithUsers {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
