import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <div className="task">
            <h2>{todo.title}</h2>
            <p>{todo.name}</p>
            <p>{todo.userName}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
