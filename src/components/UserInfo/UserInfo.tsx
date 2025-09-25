import React from 'react';
import { User } from '../../Types/Users';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
