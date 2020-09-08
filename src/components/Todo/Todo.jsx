import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

export const Todo = ({ title, completed, id, userId, userName }) => (
  <div className="todo">
    <p>
      {`ID: ${id}`}
    </p>
    <p>
      {userName}
    </p>
    <p>
      {userId}
    </p>
    <p>
      {title}
    </p>
    <input
      type="checkbox"
      value={completed}
    />
  </div>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
