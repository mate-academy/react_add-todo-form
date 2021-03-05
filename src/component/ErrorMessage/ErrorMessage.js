import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

export const ErrorMessage = ({
  errors,
}) => (
  <div className="ErrorMessage">
    {errors === 'not specified user' && (
      <div className="error">
        Please choose a user
      </div>
    )}

    {errors === 'not specified todo' && (
      <div className="error">
        Please enter the title
      </div>
    )}

    {errors === 'to short todo' && (
      <div className="error">
        Todo must be at least 10 characters long
      </div>
    )}
  </div>
);

ErrorMessage.propTypes = {
  errors: PropTypes.string.isRequired,
};
