declare type TodoType = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
  user: UserType | null,
};

declare type UserType = {
  id: number,
  name: string,
  username: string,
  email: string,
};
