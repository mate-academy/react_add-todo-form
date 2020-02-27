import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>User</th>
        <th>Task</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
