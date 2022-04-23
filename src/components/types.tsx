export interface User {
  id: number,
  name: string,
  username: string,
  email:string,
  phone: string,
}

export interface Todo {
  id: number;
  userId: number;
  title: string,
  completed: boolean,
  user: User | null,
}
