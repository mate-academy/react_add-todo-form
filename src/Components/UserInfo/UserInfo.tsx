import React from 'react';
import './UserInfo.scss';
import { User } from '../../Types/user';

interface Props {
  user : User,
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="user-info">
      <p className="user-info__item">
        {user.name}
      </p>
      <p className="user-info__item">
        {user.username}
      </p>
      <p className="user-info__item">
        {user.email}
      </p>
    </div>
  );
};
