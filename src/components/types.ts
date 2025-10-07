export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
};
