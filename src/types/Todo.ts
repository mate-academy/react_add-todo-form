import { Users } from "./User";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user?: Users | null;
}
