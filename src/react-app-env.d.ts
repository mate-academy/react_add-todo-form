/// <reference types="react-scripts" />

interface User {
  id: number,
  name: string,
  email: string,
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface PrepearedTodo extends Todo {
  user: User | null,
}
