export interface PreparedTodos {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User | null;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}
