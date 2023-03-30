import { FC } from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

interface UserInfoProps {
  user: User;
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => {
  const {
    name,
    email,
  } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
