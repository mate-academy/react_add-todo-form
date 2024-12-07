import React from 'react';
import '../../App.scss';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserListProps {
  todoUserId: number;
  users: User[];
}

export const UserInfo: React.FC<UserListProps> = ({ todoUserId, users }) => {
  const findUser = (todoUserId: number) => {
    return (
      users.find(user => user.id === todoUserId) || {
        id: 0,
        name: '',
        username: '',
        email: '',
      }
    );
  };

  return (
    <a className="UserInfo" href={`mailto:${findUser(todoUserId)?.email}`}>
      {findUser(todoUserId)?.name}
    </a>
  );
};
