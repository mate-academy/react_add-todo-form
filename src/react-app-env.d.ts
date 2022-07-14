/// <reference types="react-scripts" />
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}

export interface User {
  name: string;
  email: string;
}
