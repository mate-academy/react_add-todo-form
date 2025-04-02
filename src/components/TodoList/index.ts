export * from './TodoList';

export interface Todo {
  id: string; // id agora é string para suportar UUID
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
