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
  user: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default SelectOption;
