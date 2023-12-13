export interface Todos {
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

export interface TodosWithUser extends Todos{
  user: User | null;
}
