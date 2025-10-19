export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoFromServer {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User;
  userId: number;
}
