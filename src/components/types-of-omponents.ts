export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UserInfoProps {
  user: User | null | undefined;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user?: User | null;
}

export interface TodoInfoProps {
  todo: Todo;
}

export interface ListOfTodos {
  todos: Todo[];
}
