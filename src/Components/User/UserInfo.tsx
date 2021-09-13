import React from 'react';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = (props) => {
  const { user } = props;
  const { name, username, email } = user;

  return (
    <>
      <div className="list-item">{name}</div>
      <div className="list-item">{username}</div>
      <div className="list-item">{email}</div>
    </>
  );
};
