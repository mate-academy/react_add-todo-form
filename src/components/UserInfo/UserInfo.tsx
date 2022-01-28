import React from 'react';

type UserProps = {
  user: User,
};

export const UserInfo: React.FC<UserProps> = ({ user }) => (
  <>
    <p className="todo__name">{user.name}</p>
    <p className="">{`Email: ${user.email}`}</p>
  </>
);
