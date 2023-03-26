import React from 'react';
import { User } from '../../types/User';

type Props = {
  users: User,
};

export const UserInfo: React.FC<Props> = ({ users }) => {
  return (
    <a className="UserInfo" href={`mailto:${users.email}`}>
      {users.name}
    </a>
  );
};
