import { User } from "./userInfo";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user: User | null;
}
