import React from 'react';

import { User } from '../../Types/User';

type Prop = {
  user:User | null
};

export const UserInfo:React.FC<Prop> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
