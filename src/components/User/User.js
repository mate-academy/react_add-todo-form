import React from 'react';
import { UserShapes } from '../../Shapes';

export const User = ({ user }) => (
  <td>{user.name}</td>
);

User.propTypes = UserShapes.isRequired;
