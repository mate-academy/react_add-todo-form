import React from 'react';
import PropTypes from 'prop-types';

import { ToDoItem } from '../TodoItem/TodoItem';

export const ToDoList = ({ todos }) => (
  todos.map(todo => (
    <ToDoItem key={todo.id} {...todo} />
  ))
);

ToDoList.proptypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
};
