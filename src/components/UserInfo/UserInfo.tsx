import React from 'react';

type Props = {
  name :string,
  email :string
};

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <>
    <p data-cy="username">{name}</p>
    <p data-cy="email">{email}</p>
  </>
);
