import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';
import './TodoList.scss';
import { TodoType } from '../../types';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id} className="todo__item">
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = PropTypes.arrayOf(TodoType).isRequired;
