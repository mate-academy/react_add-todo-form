/// <reference types="react-scripts" />
interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface TodoList extends Todo {
  user: User | null,
}
