import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

export const ErrorMessage = ({ errorText, state }) => (
  <div className={ state ? 'error' : 'hidden'}>
    <h2>{ errorText }</h2>
  </div>
);

ErrorMessage.propTypes = {
  errorText: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
}
