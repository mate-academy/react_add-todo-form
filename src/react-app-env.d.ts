/// <reference types="react-scripts" />
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  user: User | null;
  title: string;
  completed: boolean;
  id: number;
}
