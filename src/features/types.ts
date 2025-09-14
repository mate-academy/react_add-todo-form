export type User = {
  id: number;
  name: string;
  email: string;
};

export type TodoWithUser = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
};
