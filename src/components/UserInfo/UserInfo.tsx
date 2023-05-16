import React from 'react';
import { User } from '../../Type/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${email}`}
    >
      {name}
    </a>
  );
};
