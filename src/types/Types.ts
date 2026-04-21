export type Todos = {
  id: number;
  title: string;
  completed: boolean;
  user: User;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoListProps = {
  todos: Todos[];
};

export type TodoInfoProps = {
  todo: Todos;
};

export type UserInfoProps = {
  user: User;
};
