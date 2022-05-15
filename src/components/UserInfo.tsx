import React from 'react';
import { User } from '../types/User';

type Props = Pick<User, 'name' | 'email'>;

export const UserInfo: React.FC<Props> = ({ name, email }) => {
  return (
    <div className="user">
      <p className="user__name">
        {name}
      </p>
      <p className="user__email">
        {email}
      </p>
    </div>
  );
};
