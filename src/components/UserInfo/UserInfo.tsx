import React from 'react';
import { User } from '../Types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a
    className="UserInfo"
    href={`mailto:${user.email}`}
    data-id={user.id}
  >
    {user.name}
  </a>
);
