import React from 'react';
import PropTypes from 'prop-types';
import { ValueShape } from '../../shapes/Shapes';

export const Option = ({ text, disabled, value }) => (
  <option value={value} disabled={disabled}>
    {text}
  </option>
);

Option.defaultProps = {
  disabled: false,
};

Option.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  value: ValueShape.isRequired,
};
