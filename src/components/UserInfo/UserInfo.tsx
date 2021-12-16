import React from 'react';

import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="todoList__userNameContacts">
      <h3 className="todoList__name">{user.name}</h3>
      <p className="todoList__email">{user.email}</p>
    </div>
  );
};
