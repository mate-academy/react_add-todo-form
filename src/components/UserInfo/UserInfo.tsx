import React from 'react';
import { User } from '../../types/user';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a
      className="UserInfo has-text-link"
      href={`mailto:${user.email}`}
      key={user.id}
    >
      {user.name}
    </a>
  );
};
