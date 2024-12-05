export interface Todo {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
