export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type TodoInfoType = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: UserType;
};
