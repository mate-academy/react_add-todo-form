export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface TodoListType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
}

export interface TodosType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
