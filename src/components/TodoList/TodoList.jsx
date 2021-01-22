import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <div className="content">
    <div className="heading">
      <span>User</span>
      <span>Task</span>
      <span>Status</span>
    </div>
    <ul className="list">
      {todos.map(todo => (
        <Todo {...todo} key={todo.id} />
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
