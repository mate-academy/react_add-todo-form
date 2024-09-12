export type User = {
  id: number;
  name: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  user: User | null;
  completed: boolean;
};
