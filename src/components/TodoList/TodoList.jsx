import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

import { Todo } from '../Todo';

export function TodoList({ todos }) {
  return (
    <div className="todos">
      <ul className="todos__container">
        {todos.map(todo => (
          <li className="todos__item" key={todo.id}>
            <p className="todos__task-id">
              Task number:
              {' '}
              {todo.id}
            </p>
            <Todo {...todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
