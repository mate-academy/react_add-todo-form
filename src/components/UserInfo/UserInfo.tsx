import React from 'react';
import { User } from '../../types/interface';

type TypeUserInfo = {
  user: User;
};

export const UserInfo: React.FC<TypeUserInfo> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
