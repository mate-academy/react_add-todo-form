import React from 'react';
import { User } from '../type/user';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo:React.FC<Props> = ({ user }) => (
  <div className="User">
    <span>{user.name}</span>
    <span>{user.username}</span>
    <span>{user.email}</span>
    <span>{user.phone}</span>
  </div>
);
