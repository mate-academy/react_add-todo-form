import React from 'react';
import { UsersType } from '../../react-app-env';

// Create a `UserInfo` component accepting a `user` object and use it to render
// a `todo.user` in the list with some styling. (Show at least a `name` and an
// `email` of the `user`)

// Add a default export statement for UserInfo component to use it in the other files
type Props = {
  user: UsersType,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <p data-cy="username">{user.name}</p>
    <p data-cy="email">{user.email}</p>
  </>
);
