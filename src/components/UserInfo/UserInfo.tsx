import React from 'react';
import { UserType } from '../../types/UserType';
import './UserInfo.scss';

type Props = {
  user: UserType | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="userinfo">
    <p className="userinfo__item">
      Name:
      {user?.name}
    </p>
    <p className="userinfo__item">
      Email:
      {user?.email}
    </p>
    <p className="userinfo__item">
      Phone:
      {user?.phone}
    </p>
  </div>
);
