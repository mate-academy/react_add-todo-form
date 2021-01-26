import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, userName }) => (
  <>
    <h2>{title}</h2>
    <p>
      Status:
      {' '}
      {completed ? 'completed' : 'uncompleted'}
    </p>
    <p>{userName}</p>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};
