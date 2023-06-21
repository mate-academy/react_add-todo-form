/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-console */
import React from 'react';
import { UserInfoProps } from './type';

export const UserInfo: React.FC<UserInfoProps> = React.memo(({ user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user.email}`}
    >
      {user.name}
    </a>
  );
});
