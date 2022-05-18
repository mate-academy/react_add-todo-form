import React from 'react';
import './UserInfo.scss';
import { Users } from '../../types/User';

type Props = {
  user: Users
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <span className="user user-first">
      {`Name: ${user?.name}`}
    </span>
    <span className="user">
      {`Email: ${user?.email}`}
    </span>
  </>
);
