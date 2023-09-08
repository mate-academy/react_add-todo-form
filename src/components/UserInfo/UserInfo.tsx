import './UserInfo.scss';
import React from 'react';
import { User } from '../../types/user.types';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
