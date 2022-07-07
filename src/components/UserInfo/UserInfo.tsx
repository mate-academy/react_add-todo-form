/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { User } from '../../typedefs';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email, username } = user;

  return (
    <div>
      <h2 data-cy="username">{name}</h2>
      <p data-cy="email">{email}</p>
      <p>{username}</p>
    </div>
  );
};
