import { FC } from 'react';
import type { User } from '../../types';

interface UserInfoProps {
  user: User;
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
