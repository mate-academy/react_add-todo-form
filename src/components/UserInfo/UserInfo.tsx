import React from 'react';

type Props = {
  name: string,
  email: string
};

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <>
    <div className="todos__name">{name}</div>
    <div className="todos__email">{email}</div>
  </>
);
