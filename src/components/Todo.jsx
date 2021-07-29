import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, user, completed }) => (
  <div>
    <h2>{title}</h2>
    <p>
      {'Name: '}
      {user.name}
    </p>
    <p>{completed ? 'Completed' : 'Not completed'}</p>
  </div>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  completed: PropTypes.bool.isRequired,
};
