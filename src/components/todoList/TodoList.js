import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../todo';

export const TodoList = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li className="card" key={todo.id}>
        <Todo
          title={todo.title}
          completed={todo.completed}
          user={todo.user.name}
        />
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
