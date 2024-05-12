export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export interface TodoInfoProps {
  id: number;
  title: string;
  completed: boolean;
  todos: TodoItem[];
  user: User;
}

export interface UserInfoProps {
  user: User;
}

export interface TodoListProps {
  todos: TodoItem[];
  submitted: boolean;
}
