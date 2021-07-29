import React from 'react';
import propTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <div>
    <ol>
      {todos.map(todo => (
        <li key={todo.id}>
          <h2>
            User:
            {' '}
            {todo.user.name}
          </h2>
          <p>{todo.title}</p>
        </li>
      ))}
    </ol>
  </div>
);

TodoList.propTypes = {
  todos: propTypes.arrayOf(propTypes.shape().isRequired).isRequired,
};
