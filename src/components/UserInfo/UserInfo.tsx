import React from 'react';
import { User } from '../../api/type/type';

type Props = {
  user: User; // now required
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`} data-cy="user-info">
      {name}
    </a>
  );
};
