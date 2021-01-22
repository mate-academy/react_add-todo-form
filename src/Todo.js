import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, user }) => (
  <div>
    <h2>{title}</h2>
    <p>
      Status:
      {completed ? 'finished' : 'unfinished'}
    </p>
    <p>{user.name}</p>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
    },
  ).isRequired,
};
