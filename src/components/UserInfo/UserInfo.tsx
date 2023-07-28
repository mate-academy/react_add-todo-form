import React from 'react';
import { User } from '../User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  const { name, email, id } = user;

  return (
    <a key={id} className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
