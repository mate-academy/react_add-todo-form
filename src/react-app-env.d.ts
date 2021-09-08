/// <reference types="react-scripts" />

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}
interface Todo {
  user: User | null,
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}
