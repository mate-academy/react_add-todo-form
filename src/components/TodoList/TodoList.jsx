import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import classNames from 'classnames';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={classNames(`todo__item`, {
          completed: todo.completed
        })}
      >
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
