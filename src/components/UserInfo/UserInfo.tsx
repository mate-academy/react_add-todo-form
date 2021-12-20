import React from 'react';
import { User } from '../types/User';
import './UserInfo.scss';

export const UserInfo: React.FC<User> = ({ email, name }) => (
  <div className="User">
    <h3 className="User__name">{name}</h3>
    <span className="User__email">{email}</span>
  </div>
);
