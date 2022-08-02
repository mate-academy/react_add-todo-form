export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface MergeTodosUsers extends Todo {
  user: User | undefined;
}
