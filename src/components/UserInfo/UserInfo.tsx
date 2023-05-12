import React from 'react';
import { User } from '../../types/User';

interface UserProps {
  user: User;
}
export const UserInfo: React.FC<UserProps> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
