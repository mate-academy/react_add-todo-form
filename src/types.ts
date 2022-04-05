export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
}

export interface Todo {
  userId: number | undefined;
  id: number;
  title: string;
  completed: boolean;
}

export type AllTodo = Todo & {
  user?: User;
};
