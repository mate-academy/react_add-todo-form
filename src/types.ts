export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface TodoWithUser extends Todo {
  user: User | null;
}
