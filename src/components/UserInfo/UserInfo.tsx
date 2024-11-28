import React from 'react';
import { User } from '../../types';

type Props = {
  userInfo: User;
};

export const UserInfo: React.FC<Props> = ({ userInfo }) => {
  return (
    <a className="UserInfo" href={userInfo.email}>
      {userInfo?.username ?? ''}
    </a>
  );
};
