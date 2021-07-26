import React from 'react';
import PropTypes from 'prop-types';

export const Option = ({ id, name }) => (
  <option value={id}>
    {name}
  </option>
);

Option.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
