import React from 'react';

import { User } from '../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    name,
    username,
    email,
  } = user;

  return (
    <>
      <p>
        <b>Name:</b>
        {' '}
        {name}
      </p>

      <p>
        <b>Username:</b>
        {' '}
        {username}
      </p>

      <p>
        <b>Email:</b>
        {' '}
        {email}
      </p>
    </>
  );
};
