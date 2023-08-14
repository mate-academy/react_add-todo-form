export interface Todo {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | undefined;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
