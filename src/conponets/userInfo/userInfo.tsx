import React from 'react';
import { UserTypes } from '../../types/UserTypes';

type Props = {
  user: UserTypes
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <span className="todo-list__user-info">
      {user.name}
    </span>
    <span className="todo-list__user-info">
      {user.username}
    </span>
  </>
);
