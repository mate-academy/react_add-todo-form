import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';

export const Option = ({ users }) => (
  <>
    <option>
      Choose a user
    </option>
    {users.map(user => (
      <option key={user.id}>
        {user.name}
      </option>
    ))}
  </>
);

Option.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
};
