import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';

export const TodoList = ({ todoList }) => (
  <table className="table">
    <thead>
      <tr>
        <th>id</th>
        <th>Name</th>
        <th>Todo</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {todoList.map(todo => (
        <tr key={todo.id}>
          <td>
            {todo.id}
            {'.'}
          </td>
          <td>
            {todo.user.name}
          </td>

          <td>
            {todo.title}
          </td>

          <td>
            {todo.completed
              ? 'Is completed'
              : 'Is not completed'
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
