import React from 'react';
import './UserInfo.scss';

import { User } from '../../types/User';

interface Props {
  user: User | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
