import React from 'react';
import PropTypes from 'prop-types';
import { UserPropTypes } from '../TodoPropTypes';

export const Users = ({
  users,
}) => (
  <>
    <option value="0">
      Choose a user
    </option>
    {users.map(user => (
      <option
        key={user.id}
        value={user.id}
      >
        {user.name}
      </option>
    ))
    }
  </>
);

Users.propTypes = {
  users: PropTypes.arrayOf(UserPropTypes).isRequired,
};
