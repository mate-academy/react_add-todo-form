export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodosWithUsers = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};
