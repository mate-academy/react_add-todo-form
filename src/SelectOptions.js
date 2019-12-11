import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = ({ user }) => (
  <option
    value={user.id}
  >
    {user.name}
  </option>
);

SelectOption.propTypes = {
  user: PropTypes.shape(
    {
      id: PropTypes.number,
      name: PropTypes.string,
    }
  ).isRequired,
};

export default SelectOption;
