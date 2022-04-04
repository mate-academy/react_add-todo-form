import React from 'react';
import './UserInfo.scss';

import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="todo-list__user-info card">
    <h3 className="card__name">{user.name}</h3>
  </div>
);
