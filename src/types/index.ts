export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoBase = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Todo = TodoBase & {
  user: User;
};
