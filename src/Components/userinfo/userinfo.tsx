import React from 'react';
import './userinfo.scss';
import { User } from '../../react-app-env';

interface Props {
  user: User,

}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <div
      data-cy="username"
      className="name message-header"
    >
      {user.name}
    </div>
    <div
      data-cy="email"
      className="userEmail"
    >
      {user.email}
    </div>
  </>
);
