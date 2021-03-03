import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.css';

export const ErrorMessage = ({
  selectErrorHidden,
  titleErrorHidden,
  titleLengthErrorHidden,
}) => (
  <div className="ErrorMessage">
    <div className="error" hidden={selectErrorHidden}>
      Please choose a user
    </div>
    <div className="error" hidden={titleErrorHidden}>
      Please enter the title
    </div>
    <div className="error" hidden={titleLengthErrorHidden}>
      Todo must be at least 10 characters long
    </div>
  </div>
);

ErrorMessage.propTypes = {
  selectErrorHidden: PropTypes.bool.isRequired,
  titleErrorHidden: PropTypes.bool.isRequired,
  titleLengthErrorHidden: PropTypes.bool.isRequired,
};
