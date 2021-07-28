import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { Todo } from '../Todo/Todo';
import { User } from '../User/User';

export const TodoList = ({ todos }) => (
  <ul className="list list-group">
    {todos.map(todo => (
      <li className="list-group-item" key={todo.id}>
        <Todo title={todo.title} completed={todo.completed} />
        {' | '}
        <User user={todo.user.name} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
