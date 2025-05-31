import React from 'react';
import { User } from '../../types/User';

export const UserInfo: React.FC<{ user?: User }> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo">Unknown user</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
