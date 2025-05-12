import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: User | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo">Unknown User</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
