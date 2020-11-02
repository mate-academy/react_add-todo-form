import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';

export const Options = ({ users }) => (
  <>
    <option value={0}>Choose a User</option>
    {
      users.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))
    }
  </>
);

Options.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
};
