/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */

import React from 'react';
import PropTypes from 'prop-types';

import { TodoItem } from '../TodoItem';
import './todoList.css';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map((todo) => (
      <li key={todo.id} className="todo-item">
        <TodoItem {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ),
};

TodoList.defaultProps = { todos: [] };
