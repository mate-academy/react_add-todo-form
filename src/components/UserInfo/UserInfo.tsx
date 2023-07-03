import React from 'react';
import { UserInterface } from '../../types/User';

type Props = {
  user: UserInterface,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a
      href={`mailto:${user.email}`}
      className="UserInfo"
    >
      {user.name}
    </a>
  );
};
