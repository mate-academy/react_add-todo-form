import PropTypes from 'prop-types';
import React from 'react';
import './App.css';

const Todo = ({ todo }) => (
  <tr
    className="todo-list__row"
  >
    <td>{todo.id}</td>
    <td>{todo.userName}</td>
    <td>{todo.title}</td>
    <td>
      <input
        className="todo-check"
        type="checkbox"
        id={todo.id}
        defaultChecked={todo.completed}
      />
    </td>
  </tr>
);

Todo.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Todo;
