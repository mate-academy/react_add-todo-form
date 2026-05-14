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
}

export type TodoWithUser = Todo & {
  user: User | null;
};

export interface TodoListProps {
  todos: TodoWithUser[];
}

export interface TodoInfoProps {
  todo: TodoWithUser;
}

export interface UserInfoProps {
  user: User;
}

export interface CreateTodoFormProps {
  users: User[];
  onAddTodo: (title: string, userId: number) => void;
}
