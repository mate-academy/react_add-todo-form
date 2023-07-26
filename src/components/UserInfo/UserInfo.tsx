import React from 'react';
import { User } from '../User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a key={user.id} className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
