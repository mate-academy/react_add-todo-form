import React from 'react';
import { usersType } from '../../types/types';

export const User = ({ user }) => (
  <div className="user-info">
    <p>{user.name}</p>
    <a href={`mailto:${user.email}`}>{user.email}</a>
  </div>
);

User.propTypes = {
  user: usersType.isRequired,
};
