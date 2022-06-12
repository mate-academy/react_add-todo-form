import React from 'react';
import { User } from '../types';

type Props = {
  user: User | null,
};

const UserInfo: React.FC<Props> = ({ user }) => (
  user ? (
    <div>
      <div className="userName">
        {user.username}
      </div>
      <div>
        {user.name}
      </div>
      <div className="userEmail">
        {user.email}
      </div>
    </div>
  ) : (
    <div>
      User not found
    </div>
  )

);

export default UserInfo;
