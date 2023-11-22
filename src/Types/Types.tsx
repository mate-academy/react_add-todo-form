export type Todo = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: User | null,
};

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};
