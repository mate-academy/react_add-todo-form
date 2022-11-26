/// <reference types="react-scripts" />

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
