/// <reference types="react-scripts" />

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}

interface User {
  id: number,
  name: string,
  email: string,
}

interface PreparedTodo extends Todo {
  user: User | null,
}
