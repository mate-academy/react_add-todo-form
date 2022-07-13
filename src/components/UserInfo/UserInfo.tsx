// Create a `UserInfo` component accepting a `user` object and use it to render
// a `todo.user` in the list with some styling. (Show at least a `name` and an
// `email` of the `user`)

// Add a default export statement for UserInfo component to use it in the other files
import React from 'react';
import './UserInfo.scss';
import { User } from '../../types/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-info">
      <span data-cy="username">{user.name}</span>
      ┊
      <span>{user.username}</span>
      <span className="user-info__email" data-cy="email">{`${user.email.toLowerCase()}`}</span>
    </div>
  );
};
