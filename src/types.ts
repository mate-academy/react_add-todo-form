export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoFromServer = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Todo = TodoFromServer & {
  user: User;
};
