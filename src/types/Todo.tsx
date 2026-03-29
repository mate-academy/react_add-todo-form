export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: {
    email?: string;
    id?: number;
    name?: string;
    username?: string;
  };
};
