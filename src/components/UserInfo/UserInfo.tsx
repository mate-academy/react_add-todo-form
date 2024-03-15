import React from 'react';
import { UserType } from '../../types/UserType';

type Props = {
  user: UserType;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
