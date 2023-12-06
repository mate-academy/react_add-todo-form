export interface User {
  email: string;
  id: number;
  name: string;
  username: string;
}

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}
