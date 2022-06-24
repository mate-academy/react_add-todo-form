/// <reference types="react-scripts" />

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ToDos {
  title: string;
  completed: boolean;
  user: User | null;
  id: number;
  userId: number;
}
