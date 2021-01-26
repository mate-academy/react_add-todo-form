import React from 'react';
import PropTypes from 'prop-types';

export const ToDoItem = ({ title, completed, user }) => (
  <div className="box">
    <p>
      <strong>
        User:
      </strong>
      {' '}
      {user}
    </p>
    <p>
      Task:
      {' '}
      {title}
    </p>
    <p>
      Completed:
      {' '}
      {completed ? 'Done' : 'in process'}
    </p>
  </div>
);

ToDoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.string.isRequired,
};
