import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.css';

export const TodoList = ({ todos, toggleCheckbox }) => (
  <ol className="TodoList">
    {todos.map(todo => (
      <li key={todo.id}>
        <h2>{todo.title}</h2>
        <p>
          completed:
          {' '}
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCheckbox(todo)}
          />
        </p>
        <p>
          performer:
          {' '}
          {todo.performer.name}
        </p>
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleCheckbox: PropTypes.func.isRequired,
};
