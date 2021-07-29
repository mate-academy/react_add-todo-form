import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';
import './TodosList.css';

export const TodosList = ({ todos }) => (
  <ul className="todosList">
    {todos.map(todo => (
      <li className="todosList__item" key={todo.id}>
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
