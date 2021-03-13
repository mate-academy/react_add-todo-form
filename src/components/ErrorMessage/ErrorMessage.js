import React from 'react';
import PropsTypes from 'prop-types';
import './ErrorMessage.css';

export function ErrorMessage(props) {
  return (
    <div className="error-message">
      <h2 className="error-message__header">
        {props.title}
      </h2>

      <p className="error-message__text">
        {props.message}
      </p>
    </div>
  );
}

ErrorMessage.propTypes = {
  title: PropsTypes.string.isRequired,
  message: PropsTypes.string.isRequired,
};
