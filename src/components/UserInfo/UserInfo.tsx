import React from 'react';
import './UserInfo.scss';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <p className="todoList__user">
      {`${user?.name} ${user?.email}`}
    </p>
  );
};
