/// <reference types="react-scripts" />
export interface User {
  id: number,
  name: string,
  email: string,
}

export interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
  user: User | null,
}
