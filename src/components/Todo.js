import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const Todo = ({ id, user, title, completed }) => (
  <li className="card">
    <span className="card__number">{id}</span>
    <User user={user} />
    <p>
      <strong>To-do: </strong>
      <i>{title}</i>
    </p>
    <p>
      <strong>Complete: </strong>
      {
        completed
          ? <span className="todo__done">Done</span>
          : <span className="todo__notDone">In process</span>
      }
    </p>
  </li>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todo;
