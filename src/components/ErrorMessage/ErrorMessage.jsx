import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

export const ErrorMessage = ({ errorText, hasError }) => (
  <div className={ hasError ? 'error' : 'hidden'}>
    <h2>{ errorText }</h2>
  </div>
);

ErrorMessage.propTypes = {
  errorText: PropTypes.string.isRequired,
  hasError: PropTypes.bool.isRequired,
}
