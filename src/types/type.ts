export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

export type ToDo = {
  id: number,
  title: string,
  completed: boolean,
  user: User | null,
};
