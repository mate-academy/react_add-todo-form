import React from 'react';
import PropTypes from 'prop-types';

export const Option = ({ text }) => (
  <option>
    {text}
  </option>
);

Option.propTypes = {
  text: PropTypes.string.isRequired,
};
