export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export interface NewTodo {
  title: string;
  userId: string;
}

export interface TodoInfoProps {
  todo: Todo;
  users: User[];
}

export interface TodoListProps {
  todos: Todo[];
  users: User[];
}

export interface UserInfoProps {
  user: User;
}
