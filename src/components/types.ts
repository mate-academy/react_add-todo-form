export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoFromServer = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Todo = TodoFromServer & {
  user: User;
};
