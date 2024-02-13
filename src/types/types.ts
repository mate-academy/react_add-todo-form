export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoFromServer {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
