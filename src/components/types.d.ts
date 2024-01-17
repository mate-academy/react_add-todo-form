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
  user: User | undefined;
}

export interface TodoListProps {
  todoList: Todo[];
}

export interface UserProps {
  userInfo: User;
}

export interface TodoInfoProps {
  todoInfo: Todo
}
