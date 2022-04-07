export interface User {
  name: string;
  email: string;
}

export interface Todo {
  id: number | string,
  title: string,
  completed?: boolean,
}

export interface FullTodo extends Todo {
  user?: User | null,
}
