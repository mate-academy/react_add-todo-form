import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './ToDo';

export const Todolist = ({ todos }) => (
  <ol className="list-group list-group-numbered">
    {todos.map(todo => (
      <li
        className="todo list-group-item list-group-item-secondary"
        key={todo.id}
      >
        <Todo {...todo} />
      </li>
    ))}
  </ol>
);

Todolist.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
