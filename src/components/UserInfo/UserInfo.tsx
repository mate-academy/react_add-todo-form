import React from 'react';

type Props = {
  name: string,
  email: string,
};

export const UserInfo = React.memo<Props>(
  ({ name, email }) => (
    <>
      <p>{name}</p>
      <p>{email}</p>
    </>
  ),
);
