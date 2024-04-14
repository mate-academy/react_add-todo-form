import { User } from "./User";

export interface ToDo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User | null;
}
