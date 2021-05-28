import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodoList.css';

export function TodoList({ todos }) {
  return (
    <ul className="todoList">
      {
        todos.map(todo => (
          <li className="todoList__item" key={todo.id}>
            <Todo {...todo} />
          </li>
        ))
      }
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};
