import React from 'react';
import './TodoList.css';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos, onCheck }) => (
  <table className="table table-hover table-active">
    <thead>
      <tr className="table-primary">
        <th>#</th>
        <th>User name</th>
        <th>Title</th>
        <th>Completed</th>
      </tr>
    </thead>
    <tbody>
      <TodoItem todos={todos} onCheck={onCheck} />
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.any).isRequired,
  onCheck: PropTypes.func.isRequired,
};
