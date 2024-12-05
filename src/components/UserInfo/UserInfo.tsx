import React from 'react';
import '../../App.scss';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserListProps {
  users: User[];
}

export const UserInfo: React.FC<UserListProps> = ({ users }) => {
  return (
    <>
      <option value="" disabled>
        Choose a user
      </option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </>
  );
};
