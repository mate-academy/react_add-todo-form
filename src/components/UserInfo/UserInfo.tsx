import React from 'react';

type Props = {
  name: string,
  email: string,
};

export const UserInfo: React.FC<Props> = ({ name, email }) => (
  <>
    <p className="todos__name">
      Name:
      {' '}
      {name}
    </p>
    <p className="todos__email">
      Email:
      {' '}
      {email}
    </p>
  </>
);
