import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ text, action }) => (
  <button
    type="button"
    className="btn btn-primary"
    onClick={action}
  >
    {text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
