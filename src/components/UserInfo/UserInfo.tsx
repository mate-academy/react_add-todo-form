import React from 'react';
import { User } from '../../types/user';

type Props = {
  user: User | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
