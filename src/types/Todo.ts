export type TodoWithUser = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: { id: number; name: string; username: string; email: string };
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
