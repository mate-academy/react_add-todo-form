/// <reference types="react-scripts" />

export interface User {
  id: number,
  name: string,
  email: string,
}

export interface ToDo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

export interface PreparedToDo extends ToDo {
  user: User | null,
}
