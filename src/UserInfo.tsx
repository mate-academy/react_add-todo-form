import React from 'react';
import { User } from './Types/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="user-data">
    <p>{user.name}</p>
    <p>{user.email}</p>
  </div>

);
