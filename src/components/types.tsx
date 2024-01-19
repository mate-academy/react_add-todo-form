export interface User {
  id: number;
  name: string;
  username: string,
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  user: User;
  completed: boolean;
}

export interface UserTodo{
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}
