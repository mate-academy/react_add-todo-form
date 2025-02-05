export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}
