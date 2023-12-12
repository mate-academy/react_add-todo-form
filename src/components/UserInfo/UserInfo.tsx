import React from 'react';
import { User } from '../../types/UserTypes';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({
  user: {
    email,
    name,
  },
}) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
