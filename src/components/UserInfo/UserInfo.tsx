import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <ul className="User-info">
    <li className="User-info__person">
      {`For ${user.name} ${user.username}`}
    </li>
    <li className="User-info__email">{user.email}</li>
  </ul>
);
