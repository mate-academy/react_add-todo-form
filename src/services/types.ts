export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

export type PreparedTodo = {
  id: number;
  title: string;
  completed: boolean;
  user?: User;
};

export type TodoListProps = {
  todos: PreparedTodo[];
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
