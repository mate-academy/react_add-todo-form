import { FC } from 'react';

import './UserInfo.scss';
import { UserInfoProps } from '../../types/UserInforTypes';

export const UserInfo: FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
