import { User } from "./User";

export type Todo = {
  userId: number | null,
  id: number,
  title: string,
  completed: boolean,
  user?: User | null
};
