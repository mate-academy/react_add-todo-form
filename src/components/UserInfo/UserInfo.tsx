import React from 'react';
import { User } from '../../utils/types/types';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a
    className="UserInfo"
    href={`mailto:${user.email}`}
  >
    {user.name}
  </a>
);
