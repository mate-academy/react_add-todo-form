import { User } from './user';

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user? : User,
}


export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}
