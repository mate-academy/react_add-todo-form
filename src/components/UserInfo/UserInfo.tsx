import React from 'react';
import { User } from '../Types/types';

interface Props {
  userId: number;
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
