import React from 'react';
import { PropsUser } from '../../types/propsUser';

export const UserInfo: React.FC<PropsUser> = ({ user }) =>
  user && (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
