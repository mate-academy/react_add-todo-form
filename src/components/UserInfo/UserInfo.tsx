import React from 'react';
import { User } from '../../types/User';

interface UserProps {
  user: User
}

export const UserInfo: React.FC<UserProps> = ({ user: { name, email } }) => (
  <a
    className="UserInfo"
    href={`mailto:${email}`}
  >
    {name}
  </a>
);
