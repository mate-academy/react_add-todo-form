import React from 'react';

import { USER } from '../../types/User';

type Props = {
  user: USER;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email || ''}`}>
      {user?.name || ''}
    </a>
  );
};
