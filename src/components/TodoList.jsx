import PropTypes from 'prop-types';
import React from 'react';
import { Todo } from './Todo';
import '../App.css';

const { uuid } = require('uuidv4');

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={uuid()} className="list__item">
        <Todo
          title={todo.title}
          name={todo.name}
          completed={todo.completed}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
