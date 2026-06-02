import React from 'react';
import { User } from '../../types/User';

interface Props {
  user: User | null;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo" />;
  }

  return (
    <a href={`mailto:${user.email}`} className="UserInfo">
      {user.name}
    </a>
  );
};
