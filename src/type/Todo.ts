export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  userLink?: {
    name: string;
    email: string;
  }
}
