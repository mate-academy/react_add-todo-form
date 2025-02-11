export interface Users {
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
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
}
