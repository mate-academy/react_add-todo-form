import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <table className="table">
    <tr>
      <th className="table__header">User</th>
      <th className="table__header">Task</th>
      <th className="table__header">Status</th>
    </tr>
    {todos.map(todo => (
      <tr key={todo.id}>
        <Todo {...todo} />
      </tr>
    ))}
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
