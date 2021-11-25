import React from 'react';
import { User } from '../types/User';

type Props = {
  user: User | undefined;
  userIndex: number;
};

const UserInfo: React.FC<Props> = ({ user, userIndex }) => {
  return (
    <div>
      <p>
        {userIndex + 1}
        {' '}
        {user?.name}
      </p>
    </div>
  );
};

export default UserInfo;
