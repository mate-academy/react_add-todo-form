import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Status = ({ item }) => {
  const { completed } = item;
  const className = classNames({
    completed: completed === true,
    not__completed: completed === false,
  });

  return (
    <>
      {completed ? <p className={className}>completed</p>
        : <p className={className}>not completed</p>}
    </>
  );
};

Status.propTypes = {
  item: PropTypes.string.isRequired,
};

export default Status;
