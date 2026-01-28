export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export type TodoListProps = {
  todos: Todo[];
};

export type UserInfoProps = {
  todo: Todo;
};
