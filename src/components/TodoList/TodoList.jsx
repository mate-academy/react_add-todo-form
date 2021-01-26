import React from 'react';
import './TodoList.css';

import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <table className="TodoList__table">
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id} className="TodoList__row">
          <td className="TodoList__cell">
            {todo.id}
            .
          </td>

          <td className="TodoList__cell">
            {todo.title}
          </td>

          <td className="TodoList__cell">
            {todo.user.name}
          </td>

          <td className="TodoList__cell">
            {
              todo.completed
                ? 'done'
                : 'undone'
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
