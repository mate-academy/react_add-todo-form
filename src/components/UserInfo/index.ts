export * from './UserInfo';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export interface Props {
  user: User;
}
