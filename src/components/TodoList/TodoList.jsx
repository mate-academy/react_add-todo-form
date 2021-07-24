import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span className="todo id">
            <p>id: </p>
            {todo.id}
          </span>
          <span className="todo userId">
            <p>user id: </p>
            {todo.userId}
          </span>
          <span className="todo user">
            <p>user: </p>
            {todo.user}
          </span>
          <span className="todo title">
            <p>title: </p>
            {todo.title}
          </span>
          <input className="checkbox" type="checkbox" />
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
