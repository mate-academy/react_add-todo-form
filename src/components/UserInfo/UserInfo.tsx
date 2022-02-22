import React from 'react';
import './UserInfo.scss';
import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <>
    <h1>{name}</h1>
    <p className="email">{email}</p>
  </>
);
