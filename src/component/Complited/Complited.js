import React from 'react';
import PropTypes from 'prop-types';
import './Complited.css';

export const Complited = ({ is }) => {
  if (is === true) {
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

Complited.propTypes = {
  is: PropTypes.bool.isRequired,
};
