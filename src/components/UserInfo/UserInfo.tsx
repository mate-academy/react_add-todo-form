import React from 'react';
import './UserInfo.scss';
import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
