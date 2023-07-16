export type TodoType = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: UserType | null,
};

export type UserType = {
  id: number,
  name: string,
  username: string,
  email: string,
};
