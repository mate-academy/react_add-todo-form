import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, user }) => (
  <>
    <h2>{title}</h2>
    <p>
      Status:
      {' '}
      {completed ? 'completed' : 'uncompleted'}
    </p>
    <p>{user.name}</p>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
