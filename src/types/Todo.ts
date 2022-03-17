import { User } from "./User";

export interface Todo{
  user: User | null,
  userId: number;
  id: number,
  title: String,
  completed: boolean,
}