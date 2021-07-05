import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, userName }) => (
  <>
    <span>
      {userName}
    </span>
    <span>
      {title}
    </span>
    <span>
      {completed ? 'completed' : 'in progress...'}
    </span>
  </>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
};
