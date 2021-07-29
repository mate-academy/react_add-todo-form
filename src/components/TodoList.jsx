import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from './Todo';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        <Todo
          title={todo.title}
          user={todo.user}
          comleted={todo.completed}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
