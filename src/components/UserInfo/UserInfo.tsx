import React from 'react';

import './UserInfo.scss';

import User from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
