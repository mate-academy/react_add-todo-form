import React from 'react';
import { usersType } from '../../types/types';
import './User.css';

export const User = ({ user }) => (
  <div className="user-info">
    <p>
      {user.name}
      {' '}
      <a className="user-email" href={`mailto:${user.email}`}>{user.email}</a>
    </p>

  </div>
);

User.propTypes = {
  user: usersType.isRequired,
};
