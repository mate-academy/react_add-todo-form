export type User = {
  id: number;
  name: string;
  email: string;
  username?: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};
