import React from 'react';
import PropTypes from 'prop-types';

export const SelectOption = ({ users }) => (
  <>
    <option value="">
      Please choose a user
    </option>

    {users.map(user => (
      <option
        key={user.id}
        value={user.name}
      >
        {user.name}
      </option>
    ))}
  </>
);

SelectOption.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
