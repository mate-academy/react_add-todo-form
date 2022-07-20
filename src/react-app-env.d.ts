/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userID: 1,
}

export interface User {
  name: string,
  email: string,
}

export interface PreparedTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
