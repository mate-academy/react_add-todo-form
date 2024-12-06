import React from 'react';
import '../../App.scss';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserListProps {
  user: User;
}

export const UserInfo: React.FC<UserListProps> = ({ user }) => {
  return (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  );
};
