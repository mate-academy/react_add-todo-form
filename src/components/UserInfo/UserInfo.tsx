import React from 'react';
import { User } from '../../types';
import './UserInfo.scss';

type Props = {
  user?: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
