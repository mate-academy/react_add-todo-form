import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

const Todo = ({ todo }) => (
  <tr
    key={todo.id}
    className="todo-list__row"
  >
    <td>{todo.id}</td>
    <td>{todo.userName}</td>
    <td>{todo.title}</td>
    <td>{todo.completed || 'x'}</td>
  </tr>
);

Todo.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Todo;
