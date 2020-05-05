import React from 'react';
import PropTypes from 'prop-types';
import './Completed.css';

export const Completed = ({ isCompleted }) => {
  if (isCompleted === true) {
    return (
      <p className="done">
        Complete
      </p>
    );
  }

  return (
    <p className="not-done">
      Uncomplete
    </p>
  );
};

Completed.propTypes = {
  isCompleted: PropTypes.bool.isRequired,
};
