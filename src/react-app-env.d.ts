/// <reference types="react-scripts" />

interface Todo {
  userId: number | null,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface User {
  name: string,
  email: string,
}
