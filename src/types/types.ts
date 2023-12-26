export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | undefined;
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}
