import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import './TodosList.css';

export const TodosList = ({ todos }) => (
  <ul
    className="list"
  >
    {todos.map(todo => (
      <li
        className="list__item"
        key={todo.id}
      >
        <Todo
          title={todo.title}
          user={todo.user.name}
          completed={todo.completed}
        />
      </li>
    ))
    }
  </ul>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
