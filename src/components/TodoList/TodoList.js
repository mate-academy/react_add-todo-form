import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todoList }) => (

  <ul className="todos">
    {todoList.map(todoItem => (
      <TodoItem {...todoItem} />
    ))}
  </ul>

);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
