export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: TodosUser;
}

export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodosUser {
  id: number;
  name: string;
  username: string;
  email: string;
}
