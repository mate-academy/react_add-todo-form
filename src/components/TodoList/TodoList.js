import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <ul className="todo-list">
    <li className="todo todo__head">
      <span>NAME</span>
      <span>TASK</span>
      <span>STATUS</span>
    </li>
    {todos.map(todo => (
      <li className="todo" key={todo.id}>
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
