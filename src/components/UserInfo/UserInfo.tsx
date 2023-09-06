import { User } from '../../types';

type UserProps = {
  user: User;
};

export const UserInfo = ({ user }: UserProps) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
