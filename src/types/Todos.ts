export interface Todos {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}
