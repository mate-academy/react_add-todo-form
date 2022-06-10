import React from 'react';

import { UserProps } from '../types';

export const UserInfo: React.FC <UserProps> = ({ user }) => {
  const { name, email } = user;

  return (
    <>
      <h2 className="list__item-username">
        {`Name: ${name}`}
      </h2>
      <h3 className="list__item-email">
        {`Email: ${email}`}
      </h3>
    </>
  );
};
