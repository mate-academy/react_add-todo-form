import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import allTypes from '../../types';

import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = PropTypes.arrayOf(allTypes.todoType).isRequired;
