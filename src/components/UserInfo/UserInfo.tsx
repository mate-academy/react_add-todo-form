import React from 'react';
import { IUser } from '../../types/user';

interface Props {
  user?: IUser
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
