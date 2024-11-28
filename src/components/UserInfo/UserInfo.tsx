import React from 'react';
import { User } from '../../types';

type Props = {
  userInfo: User;
};

export const UserInfo: React.FC<Props> = ({ userInfo }) => {
  return (
    <a className="UserInfo" href="mailto:Sincere@april.biz">
      {userInfo?.username ?? ''}
    </a>
  );
};
