import React from 'react';
import { User } from '../../types/User';

type Props = { user: User };

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo subtitle is-6" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
