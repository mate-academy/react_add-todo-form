export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface PreparedTodo extends Todo {
  user: User;
}
