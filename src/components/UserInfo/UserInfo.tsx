import React from 'react';
import { Props } from './UserInfo.types';

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <label title="User email">
      <a
        className="UserInfo message-body"
        href={`mailto:${email}`}
      >
        {name}
      </a>
    </label>
  );
};
