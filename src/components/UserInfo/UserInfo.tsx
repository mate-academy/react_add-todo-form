import React from 'react';
import { User } from '../../types/user';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a
    data-id={user.id}
    className="UserInfo"
    href={`mailto:${user.email}`}
  >
    {user.name}
  </a>
);
