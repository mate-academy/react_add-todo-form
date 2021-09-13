import React from 'react';

export const UserInfo: React.FC<Partial<User>> = (props) => {
  const { name, email } = props;

  return (
    <>
      <li className="users__table-item">{name}</li>
      <li className="users__table-item">{email}</li>
    </>
  );
};
