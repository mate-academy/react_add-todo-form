import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

import { Todo } from '../Todo';
import { todoType } from '../../propTypes/todoType';

export const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {
      todos.map(todo => (
        <li key={todo.id}>
          <Todo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        </li>
      ))
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(todoType).isRequired,
};
