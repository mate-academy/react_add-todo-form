import React from 'react';

type Props = {
  user: User
};

export const UserInfo:React.FC<Props> = ({ user }) => (
  <>
    <p>{user.name}</p>
    <p>{user.email}</p>
  </>
);
