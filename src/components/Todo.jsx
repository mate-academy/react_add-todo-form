import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, user }) => (
  <div className="todo">
    <h3>{title}</h3>
    <div className="user">
      <span>
        {'User name: '}
        {user.name}
      </span>
      {completed ? <p>Completed</p> : <p>Not completed</p>}
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
