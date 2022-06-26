import React from 'react';
import { User } from '../../types';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    name,
    email,
  } = user;

  return (
    <ul>
      <li>{name}</li>
      <li>{email}</li>
    </ul>
  );
};

// Create a `UserInfo` component accepting a `user` object and use it to render
// a `todo.user` in the list with some styling. (Show at least a `name` and an
// `email` of the `user`)

// Add a default export statement for UserInfo component to use it in the other files
