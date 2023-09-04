import React from 'react';
import { User } from '../../types/UserInfo';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
