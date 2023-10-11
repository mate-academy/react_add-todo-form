import React from 'react';
import { User } from '../Interfaces';

import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => {
  const emailValue = email || '';

  const mailtoLink = emailValue ? `mailto:${emailValue}` : '#';

  return (
    <a className="UserInfo" href={mailtoLink}>
      {name}
    </a>
  );
};
