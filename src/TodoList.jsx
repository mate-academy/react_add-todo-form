import React from 'react';
import './TodoList.css';

import PropTypes from 'prop-types';

export const TodoList = ({ preparedTodoList }) => (
  <table className="table">
    <tbody>
      {preparedTodoList.map(todo => (
        <tr key={todo.id} className="table__row">
          <td className="table__cell">
            {todo.id}
            .
          </td>

          <td className="table__cell">
            {todo.title}
          </td>

          <td className="table__cell">
            {todo.user.name}
          </td>

          <td className="table__cell">
            { todo.completed ? 'done' : 'undone' }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  preparedTodoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
