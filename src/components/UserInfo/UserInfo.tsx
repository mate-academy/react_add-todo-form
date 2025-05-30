import { FC } from 'react';
import { User } from '../../entities/user/User';

interface UserInfoProps {
  user: User;
}

export const UserInfo: FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
