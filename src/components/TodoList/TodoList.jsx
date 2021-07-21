import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { todoShape } from '../../types';

export const TodoList = ({ todos }) => (
  <table className="table">
    <thead>
      <tr className="table-warning">
        <th>№</th>
        <th>Task</th>
        <th>Status</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id}>
          <Todo todo={todo} />
        </tr>
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoShape).isRequired,
};
