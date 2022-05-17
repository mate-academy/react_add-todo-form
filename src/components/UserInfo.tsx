import React from 'react';
import { User } from './types/User';

type Props = {
  users: User,
};

export const UserInfo: React.FC<Props> = ({ users }) => (
  <div className="user">
    <div className="user__name">{`Name: ${users.name}`}</div>
    <div className="user__email">{`Email: ${users.email}`}</div>
  </div>
);
