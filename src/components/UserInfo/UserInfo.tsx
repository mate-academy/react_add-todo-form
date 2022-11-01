import React from 'react';
import { User } from '../../types/user';

interface Props {
  user: User | null;
}

export const UserInfo:React.FC<Props> = ({ user }) => (
  <a
    className="UserInfo"
    href={`mailto:${user?.email}`}
    data-id={user?.id}
  >
    {user?.name}
  </a>
);
