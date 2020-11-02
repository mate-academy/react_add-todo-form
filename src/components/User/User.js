import React from 'react';
import { UserShape } from '../shapes/UserShape';

export const User = ({ user }) => (
  <div className="user title">
    {user.name}
  </div>
);

User.propTypes = {
  user: UserShape.isRequired,
};
