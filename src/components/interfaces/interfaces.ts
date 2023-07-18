export interface TodosWithoutUser {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo extends TodosWithoutUser {
  user: User;
}
