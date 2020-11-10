import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../todo/Todo';
import { TodoShape } from '../shapes/TodoShape';

import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="todoList">
    {todos.map((todo, key) => (
      <li className="todoList__item">
        <span className="todoNumber">{key + 1}</span>
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};
