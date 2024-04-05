export interface Todo {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
