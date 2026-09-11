import React from 'react';
import { User } from '../../sourse/User';

const MakeHref = (user: User) => `mailto:${user.email}`;

export const UserInfo = ({ user }: { user: User }) => (
  <a className="UserInfo" href={MakeHref(user)}>
    {user.name}
  </a>
);
