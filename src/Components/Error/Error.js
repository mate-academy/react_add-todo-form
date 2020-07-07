import React from 'react';
import PropTypes from 'prop-types';

export const Error = ({ message }) => (
  <div>
    {message}
  </div>
);

Error.defaultProps = {
  message: '',
};

Error.propTypes = {
  message: PropTypes.string,
};
