import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ol className="list">
    {todos.map(todo => (
      <li className="list__item" key={todo.id}>
        <span className="list__description">
          <Todo todo={todo} />
        </span>
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
