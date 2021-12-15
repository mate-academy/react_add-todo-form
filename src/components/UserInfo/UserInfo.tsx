import React from 'react';

// types
import { User } from '../../types/user';

// style
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo:React.FC<Props> = ({ user }) => {
  return (
    <div className="user">
      <div className="user__name">{user.name}</div>
      <div className="user__mail">{user.email}</div>
    </div>
  );
};
