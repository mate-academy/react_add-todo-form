import React from 'react';
import { User } from '../../types/User';

type Props = {
  human: User;
};

export const UserInfo: React.FC<Props> = ({ human }) => {
  const { name, email } = human;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
