/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
}

export interface User {
  id: number,
  name: string,
  email: string,
}
