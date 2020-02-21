import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <ul className="todos">
    {todos.map(todo => (
      <li className="todos__item todo" key={todo.id}>
        <Todo todo={todo} />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
};
