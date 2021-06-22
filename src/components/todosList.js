import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './todo';

export const TodoList = ({ preparedTodos }) => (
  <ul className="TodoList">
    {preparedTodos.map(todo => (
      <li
        key={todo.id}
      >
        <Todo
          title={todo.title}
          userName={todo.user.name}
          id={todo.id}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.shape().isRequired,
  })).isRequired,
};
