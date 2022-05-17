export interface Users {
  email: string,
  name: string,
  username: string,
}

export interface Todos {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: Users | null;
}
