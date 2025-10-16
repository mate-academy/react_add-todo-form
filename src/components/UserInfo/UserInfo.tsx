import React from 'react';
import { User } from '../../types/User';

type Props = {
  user?: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo--empty">No user info</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
