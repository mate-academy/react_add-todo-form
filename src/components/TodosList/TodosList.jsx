import React from 'react';
import { Todo } from '../Todo';
import PropTypes from 'prop-types';
import './TodosList.css';

export const TodosList = ({ todosList }) => (
  <ul className="todos-list">
    {todosList.map(todo => (
      <li key={todo.id} className="todos-list__item">
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  )
};
