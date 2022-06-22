export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface User {
  name: string;
  email: string;
  username: string;
}

export interface PreparedTodo extends Todo {
  user?: User | null;
}
