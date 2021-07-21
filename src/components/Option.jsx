import React from 'react';
import PropTypes from 'prop-types';

export const Option = ({ name }) => (
  <option
    value={name}
  >
    {name}
  </option>
);

Option.propTypes = {
  name: PropTypes.string.isRequired,
};
