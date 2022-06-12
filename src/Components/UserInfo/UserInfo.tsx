import React from 'react';
import { User } from '../../Types/User';

export const UserInfo:React.FC<User> = ({ name, email }) => (
  <>
    <p>{name}</p>
    <p>{email}</p>
  </>
);
