import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <div className="user">
    <div className="user__name">{`Name: ${name}`}</div>
    <a href="mailto:{email}" className="user__email">{`Email: ${email}`}</a>
  </div>
);
