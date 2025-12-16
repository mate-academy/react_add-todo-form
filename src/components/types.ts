export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface ToDo {
  user: User | null;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
