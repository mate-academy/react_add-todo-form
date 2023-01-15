/// <reference types="react-scripts" />

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface TodoWithUser extends Todo {
  user: User | null,
}
