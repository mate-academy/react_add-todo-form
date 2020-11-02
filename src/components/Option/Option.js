import React from 'react';
import PropTypes from 'prop-types';

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
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
