import React from 'react';
import PropTypes from 'prop-types';
import './ErrorModal.css';

function ErrorModal(props) {
  return (
    <div className="modals">
      <p>{props.error}</p>
    </div>
  );
}

export default ErrorModal;

ErrorModal.propTypes = {
  error: PropTypes.string.isRequired,
};
