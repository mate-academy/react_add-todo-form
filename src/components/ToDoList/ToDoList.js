import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../ToDo/ToDo';
import './ToDoList.scss';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li className="element" key={todo.id}>
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
