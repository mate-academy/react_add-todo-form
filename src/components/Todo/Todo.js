import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

const Todo = ({ todo }) => (
  <li className="TodoList__Todo Todo" hidden={todo.completed}>
    {`Title: ${todo.title} Id: ${todo.userId}`}

  </li>
);

export default Todo;

Todo.propTypes = {
  todo: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
