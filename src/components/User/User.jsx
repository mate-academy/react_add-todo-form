import React from 'react';
import { UserShape } from '../Shapes/UserShape';

export const User = ({ name }) => (
  <td>
    {name}
  </td>
);

User.propTypes = UserShape;
