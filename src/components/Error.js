import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({ text }) => (
  <div className="error">
    {text}
  </div>
);

Error.propTypes = {
  text: PropTypes.string.isRequired,
};
