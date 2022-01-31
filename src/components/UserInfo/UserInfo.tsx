import React from 'react';
import '../TodoInfo/TodoInfo.scss';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  user && (
    <div>
      <span className="todo__user-name">{`Name: ${user.name}`}</span>
      <br />
      <span className="todo__user-email">{`Email: ${user.email}`}</span>
    </div>
  )
);
