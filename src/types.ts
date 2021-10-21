export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface Todo {
  user: User | null,
  userId: number,
  id: number,
  title: string,
  completed: boolean,
}
