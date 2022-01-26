import React from 'react';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <>
    <p className="todo__user-name">{name}</p>
    <p className="todo__user-email">{email}</p>
  </>
);
