import { User } from '../../types';
import React from 'react';

interface Props {
  user: User | null;
}
export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
