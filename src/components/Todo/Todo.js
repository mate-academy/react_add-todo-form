import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

const Todo = ({ todo }) => (
  <li className="TodoList__Todo Todo" hidden={todo.completed}>
    {todo.title}
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
