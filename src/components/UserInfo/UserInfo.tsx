import React from 'react';
import { User } from '../../types/User';

type InfoProps = {
  user: User,
};

export const UserInfo: React.FC<InfoProps> = ({ user }) => {
  const { name, email } = user;
  const mailTo = `mailto:${email}`;

  return (
    <a className="UserInfo" href={mailTo}>
      {name}
    </a>
  );
};
