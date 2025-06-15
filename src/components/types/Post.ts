import { User } from "./User";

export type Post = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
};
