import React from 'react';
import { Users } from '../../types/Users';

type Props = {
  user?: Users;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <div>User undefined or searcing</div>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
