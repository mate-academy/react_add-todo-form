import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ display, isValid, text }) => (
  display && !isValid && (
    <div className="todo__error">
      {text}
    </div>
  )
);

Error.defaultProps = {
  display: false,
  isValid: false,
};

Error.propTypes = {
  display: PropTypes.bool,
  isValid: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default Error;
