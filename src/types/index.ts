export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export type TodoWithUser = Todo & {
  user: User | null;
};
