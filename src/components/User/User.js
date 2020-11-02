import React from 'react';
import { UserShape } from '../../shapes/UserShape';

export const User = ({ user }) => (
  <th>{user.name}</th>
);

User.propTypes = UserShape;
