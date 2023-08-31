import { User } from '../../types/User';

export type UserProps = {
  user: User
};

export const UserInfo = ({ user: { email, name } }: UserProps) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
