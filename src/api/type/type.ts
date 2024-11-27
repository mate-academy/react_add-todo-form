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
  user: User | null;
}

export interface TodosType {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
