export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export interface Props {
  todos: Todo[];
}

export interface Prop {
  todo: Todo;
}

export interface UserExist {
  user?: User;
}
