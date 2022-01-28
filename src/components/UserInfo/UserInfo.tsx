import React from 'react';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  user && (
    <div>
      <span className="todo_user-name">{`Name: ${user.name}`}</span>
      <br />
      <span className="todo_user-email">{`Email: ${user.email}`}</span>
    </div>
  )
);
