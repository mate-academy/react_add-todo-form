import React from 'react';
import { User } from '../../interfaces/User';

interface Props {
  user: User,
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div>
    <span data-cy="username">{user.name}</span>
    <br />
    <a data-cy="email" href={`mailto:${user.email}`}>{user.email}</a>
    <br />
    {'User ID: '}
    {user.id}
  </div>
);
