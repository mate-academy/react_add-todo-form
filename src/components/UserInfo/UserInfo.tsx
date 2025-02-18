import { FC } from 'react';
import { User } from '../../types/types';

type UserInfoProps = {
  user: User;
};

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
