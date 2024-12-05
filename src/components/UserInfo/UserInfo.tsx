import React from 'react';
import { Users } from '../../types/Users';

type Props = {
  user: Users;
};

export const UserInfo: React.FC<Props> = props => {
  const { user } = props;

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
