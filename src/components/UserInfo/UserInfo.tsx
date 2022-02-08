import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  user && (
    <div className="User">
      <p className="User__name">
        Name:
        {' '}
        {user.name}
      </p>
      <p className="User__email">
        Mail:
        {' '}
        {user.email}
      </p>
    </div>
  )
);
