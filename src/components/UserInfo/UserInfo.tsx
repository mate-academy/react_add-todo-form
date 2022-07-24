import React from 'react';

type Props = {
  user: string,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div>{user}</div>
  );
};
