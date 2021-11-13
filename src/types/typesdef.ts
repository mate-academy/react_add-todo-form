export interface Todo {
  userId?: number,
  id: number,
  title: string,
}

export interface User {
  name: string
}

export interface TodoWithUser extends Todo {
  user: User | null,
}
