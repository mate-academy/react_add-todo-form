export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};
