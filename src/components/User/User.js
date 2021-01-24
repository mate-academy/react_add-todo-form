import React from 'react';
import { TypeUser } from '../../types';

export const User = ({ id, name }) => (
  <option
    value={+id}
  >
    {name}
  </option>
);

User.propTypes = TypeUser;
