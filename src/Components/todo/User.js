import React from 'react';
import { ShapeUser } from '../Shapes/ShapeUser';

export const User = ({ user }) => (
  <>
    <span>
      {user.id}
    </span>
    <span>
      {user.name}
    </span>
  </>
);

User.propTypes = ShapeUser.isRequired;
