import React from 'react';
import { User } from '../../types/User';

type Props = Pick<User, 'name' | 'username' | 'email'>;

export const UserInfo: React.FC<Props> = ({ name, username, email }) => {
  return (
    <div className="userInfo">
      <div className="userInfo__name">{`Name: ${name}`}</div>
      <div className="userInfo__username">{`Username: ${username}`}</div>
      <div className="userInfo__email">{`Email: ${email}`}</div>
    </div>
  );
};
