/// <reference types="react-scripts" />

interface Todo implements User {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}
