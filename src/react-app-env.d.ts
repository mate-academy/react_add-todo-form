/// <reference types="react-scripts" />

export interface User {
  name: string;
}

export interface Todo {
  title: string;
  completed: boolean;
  id: number;
  user: User | null;
}
