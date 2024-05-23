import { FC } from 'react';
import { User } from '../../types/types';

type UserInfoProps = {
  user?: User;
};

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
