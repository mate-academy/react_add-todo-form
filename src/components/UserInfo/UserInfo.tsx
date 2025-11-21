import { User } from '../../api/types';
import React from 'react';

type UserInf = {
  user: User;
};

export const UserInfo: React.FC<UserInf> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};

export default UserInfo;
