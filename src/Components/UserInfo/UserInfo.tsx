import React from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="text-bg-light p-3">
    <h6>{user.name}</h6>
    <p data-cy="email">{user.email}</p>
  </div>
);
