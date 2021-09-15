import React from 'react';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, username, email } = user;

  return (
    <>
      <td>{name}</td>
      <td>{username}</td>
      <td>{email}</td>
    </>
  );
};
