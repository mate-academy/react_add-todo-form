import React from 'react';
// import { User } from '../types/User';

export const UserInfo: React.FC<Partial<User>> = ({
  name,
  email,
}) => (
  <>
    <td>{name}</td>
    <td>{email}</td>
  </>
);
