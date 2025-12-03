export type User = {
  name: string;
  id: number;
  username: string;
  email: string;
};

export type TodoElement = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
};
