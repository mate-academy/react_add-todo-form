export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}
export interface ServerTodo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}
export interface AddTodoFormProps {
  users: User[];
  onAdd: (title: string, userId: number) => void;
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
