export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export interface Todo {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user?: User,
}

export type TodoListProps = {
  todos: Todo[],
};

export type TodoInfoProps = {
  todo: Todo,
};

export type UserInfoProps = {
  user: User;
};
