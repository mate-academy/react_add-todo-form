export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

export type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

export type TodoWithUser = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User,
};

export type Props = {
  todos: TodoWithUser[];
};
