import React from 'react';

import { User } from '../../types';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    throw new Error('User does not exist');
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
