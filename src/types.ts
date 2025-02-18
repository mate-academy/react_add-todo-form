export type TodoWithUser = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
