import React from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
