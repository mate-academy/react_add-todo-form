import React from 'react';
import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => user && (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
