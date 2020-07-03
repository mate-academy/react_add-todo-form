import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className="TodoList__todo">
          <h2>{todo.title}</h2>
          <p>{todo.name}</p>
          <p>{todo.userName}</p>
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    userName: PropTypes.string,
  })).isRequired,
};
