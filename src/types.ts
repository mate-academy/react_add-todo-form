export interface Todo {
  id?: number,
  title: string,
  completed: boolean,
  user: User | null;
}

export interface User {
  name: string,
  email: string,
}
