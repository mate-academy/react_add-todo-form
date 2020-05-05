import React from 'react';
import PropTypes from 'prop-types';

const Status = ({ item }) => {
  const { completed } = item;

  return (
    <>
      {completed ? <p className="completed">completed</p>
        : <p className="not__completed">not completed</p>}
    </>
  );
};

Status.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Status;
