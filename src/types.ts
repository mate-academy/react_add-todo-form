export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
