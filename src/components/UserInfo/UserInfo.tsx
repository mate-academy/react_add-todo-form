import React from 'react';

import './UserInfo.css';

import { User } from '../../types/User';

type Props = {
  userInfo: User,
};

export const UserInfo: React.FC<Props> = ({ userInfo }) => {
  const { name, email } = userInfo;

  return (
    <div className="User-info">
      <p className="User-info__item">{name}</p>
      <p className="User-info__item">{email}</p>
    </div>
  );
};
