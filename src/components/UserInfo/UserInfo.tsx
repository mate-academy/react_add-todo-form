import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="todo-info__user user">
    <p className="user__name">{user.name}</p>
    <p className="user__email">{user.email}</p>
  </div>
);
