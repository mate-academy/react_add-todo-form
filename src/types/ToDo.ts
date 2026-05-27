import { User } from "./user";

export type ToDo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};
