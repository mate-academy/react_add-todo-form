export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type UserInfoProps = {
  user: User;
};
