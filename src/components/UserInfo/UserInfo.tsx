import React from 'react';
import { UserType } from '../TodoList';

interface UserTypeCover {
  user: UserType;
}

export const UserInfo: React.FC<UserTypeCover> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
