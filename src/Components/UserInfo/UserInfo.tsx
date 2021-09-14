import React from 'react';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    name,
    username,
    email,
  } = user;

  return (
    <>
      <div className="">{`Name: ${name}`}</div>
      <div className="">{`Username: ${username}`}</div>
      <div className="">{`Email: ${email}`}</div>
    </>
  );
};
