import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    {user && (
      <>
        <p>{user.name}</p>
        <a className="UserInfo" href="mailto:{user.email}">
          {user.email}
        </a>
      </>
    )}
  </>
);
