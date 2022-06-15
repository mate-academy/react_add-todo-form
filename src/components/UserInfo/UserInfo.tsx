import React from 'react';
import { User } from '../../interfaces/User';

interface Props {
  user: User,
}

export const UserInfo: React.FC<Props> = ({ user: { email, name, id } }) => (
  <div>
    <span data-cy="username">{name}</span>
    <br />
    <a data-cy="email" href={`mailto:${email}`}>{email}</a>
    <br />
    {'User ID: '}
    {id}
  </div>
);
