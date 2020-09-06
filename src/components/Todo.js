import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, userId, name }) => (
  <div className="todo">
    <h5>
      {`ID: ${userId}`}
    </h5>

    <h5>
      {name}
    </h5>

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
  userId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};
