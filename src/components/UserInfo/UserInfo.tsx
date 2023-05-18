import React from 'react';
import { User } from '../../types/User';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({
  user: { name, email },
}) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
