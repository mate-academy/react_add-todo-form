export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface NewTodo {
  title: string;
  userId: number;
}

export interface Todo extends NewTodo {
  id: number;
  completed: boolean;
  user: User;
}
