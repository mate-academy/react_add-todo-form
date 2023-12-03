export interface Todo {
  user: User | undefined,
  id: number,
  title: string,
  completed: boolean,
  userId: number,
}

export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

export type TodosInfoType = {
  todos: Todo[],
};

export type TodoInfoType = {
  todo: Todo,
};

export type UserInfoType = {
  user: User,
};
