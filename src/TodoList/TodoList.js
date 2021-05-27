import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import { Todo } from '../Todo';

export const TodoList = ({ todos }) => (
  <ul className="todo_list">
    {todos.map(todo => (
      <Todo {...todo} />
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf({}).isRequired,
};
