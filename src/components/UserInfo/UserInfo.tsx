import React from 'react';
import { User } from '../type/User';

type TodosList = {
  user: User | null;
};

export const UserInfo: React.FC<TodosList> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
