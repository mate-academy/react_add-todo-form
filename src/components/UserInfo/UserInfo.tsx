import { FC } from 'react';
import { UserInfoProps } from './types';

export const UserInfo: FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
