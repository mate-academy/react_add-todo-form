export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UserInfoProps {
  user: User;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

export interface TodoInfoProps {
  todo: Todo;
}

export interface TodoListProps {
  todos: Todo[];
}
