import React from 'react';
import usersFromServer from '../../api/users';

interface UserInfoProps {
  user: (typeof usersFromServer)[number];
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="UserInfo" data-id={user.id}>
      <span>{user.name}</span> {''}
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
