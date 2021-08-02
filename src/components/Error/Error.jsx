import React from 'react';
import PropTypes from 'prop-types';
import './Error.css';

export const Error = ({ textError, selectError }) => (
  <div className="error">
    {textError && (
      <span className="input-error">
        Please enter the title
      </span>
    )}
    {selectError && (
      <span className="select-error">
        Please choose a user
      </span>
    )}
  </div>
);

Error.propTypes = {
  textError: PropTypes.bool.isRequired,
  selectError: PropTypes.bool.isRequired,
};
