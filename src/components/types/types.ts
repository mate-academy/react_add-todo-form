export type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?:User;
};

export type User = {
  id: number;
  name: string;
  username: string,
  email: string,
};
