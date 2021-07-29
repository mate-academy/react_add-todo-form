import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export function Todo({ title, status, user }) {
  return (
    <>
      <h2>{title}</h2>
      <p>{user.name}</p>
      <p className={classNames({
        'status-completed': status === 'completed',
        'status-in-progress': status === 'in progress',
      })}
      >
        {`Status: ${status}`}
      </p>
    </>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
