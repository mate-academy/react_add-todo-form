export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: {
    name: string;
    email: string;
  } | null;
}
