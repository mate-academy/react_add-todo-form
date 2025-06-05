import React from 'react';
import { User } from '../../types/User';

interface Props {
  user?: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo UserInfo--missing">Unknown user</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
