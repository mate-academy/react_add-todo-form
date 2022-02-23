import React from 'react';

type Props = {
  name: string | undefined,
  email: string | undefined,
};

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <>
    <p className="item__name">{name}</p>
    <p className="item__email">{email}</p>
  </>
);
