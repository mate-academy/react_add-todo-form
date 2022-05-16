import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = Pick<User, 'name' | 'username' | 'email'>;

export const UserInfo: React.FC<Props> = ({ name, username, email }) => {
  return (
    <div className="userinfo">
      <div className="userinfo--name">{`Name: ${name}`}</div>
      <div className="userinfo--username">{`Username: ${username}`}</div>
      <div className="userinfo--email">{`Email: ${email}`}</div>
    </div>
  );
};
