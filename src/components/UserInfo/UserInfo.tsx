import React from 'react';

interface UserInfoProps {
  user: {
    id: number;
    name: string;
    email: string;
  }
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <option key={user.id} value={String(user.id)}>
      {user.name}
    </option>
  );
};

export default UserInfo;
