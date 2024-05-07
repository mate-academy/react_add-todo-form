import { User } from '../../types/user';
import React from 'react';

interface Props {
  user: User;
}
export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
