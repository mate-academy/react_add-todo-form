export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  user: User;
  id: number;
  title: string;
  completed: boolean;
  userId : number;
};
