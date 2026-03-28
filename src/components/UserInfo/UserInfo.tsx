import React from 'react';
import { User } from '../Types/User';

export const UserInfo = ({ user }: { user: User }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
