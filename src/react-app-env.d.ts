/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: string | null,
}

export interface User {
  user: string | null,
}
