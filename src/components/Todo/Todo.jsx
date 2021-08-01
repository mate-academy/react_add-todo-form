import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({
  title,
  completed,
  user,
}) => (
  <div className="card mb-4">
    <h3 className="title is-3">
      {title}
    </h3>
    <div>
      <p className="has-text-primary-dark is-size-4 has-text-weight-medium">
        {user.name}
      </p>
      <p className="has-text-danger-dark">
        {completed ? 'Completed' : 'Not completed'}
      </p>
    </div>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
