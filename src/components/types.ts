// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
