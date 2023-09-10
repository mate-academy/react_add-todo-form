export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
}
