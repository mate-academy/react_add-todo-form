/// <reference types="react-scripts" />

export interface Task {
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface User {
  id: number,
  name: string,
  email: string,
}
