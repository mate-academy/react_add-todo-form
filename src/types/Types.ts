export type Todos = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoListProps = {
  users: Users[];
  todos: Todos[];
};

export type TodoInfoProps = {
  user: Users;
  todo: Todos;
};

export type UserInfoProps = {
  user: Users;
};
