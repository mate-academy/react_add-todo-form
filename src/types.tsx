export type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
};

export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};
