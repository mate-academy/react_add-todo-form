import React from 'react';
import PropTypes from 'prop-types';

export const UserNameList = ({ users }) => (
  <>
    {users.map(user => (
      <option
        value={user.id}
        key={user.key}
      >
        {user.name}
      </option>
    ))}
  </>
);

UserNameList.propTypes = PropTypes.arrayOf(
  PropTypes.string.isRequired,
).isRequired;
