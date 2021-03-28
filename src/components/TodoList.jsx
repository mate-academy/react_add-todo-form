import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { TodoType } from './Types';
import { User } from './User';

export const TodoList = ({ todos }) => (
  <div className="list">
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <p><User user={todo.user} /></p>
          <p>
            {todo.title}
            {' '}
            -
            <span>{todo.completed ? 'Completed' : 'In process'}</span>
          </p>
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};
