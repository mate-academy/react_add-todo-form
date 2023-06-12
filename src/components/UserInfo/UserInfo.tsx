import { FC } from 'react';
import { User } from '../../types/user';

type UserProps = {
  user: User,
};

export const UserInfo: FC<UserProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
