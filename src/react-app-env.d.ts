/// <reference types="react-scripts" />

interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

interface TodoWithUser extends Todo {
  user: User | null,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}
