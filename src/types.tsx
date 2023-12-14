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

export interface TodoListProps {
  todos: Todo[];
}

export interface TodoInfoProps {
  todo: Todo;
}

export interface UserInfoProps {
  user: User;
}
