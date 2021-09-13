import { User } from "./User";

export interface Todo {
  uuid: string,
  user: User | null,
  userId: number,
  id?: number,
  title: string,
  completed: boolean,
}