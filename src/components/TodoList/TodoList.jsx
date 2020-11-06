import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <span className="todo id">
            <strong>id: </strong>
            {todo.id}
          </span>
          <span className="todo userId">
            <strong>user id: </strong>
            {todo.userId}
          </span>
          <span className="todo user">
            <strong>user: </strong>
            {todo.user}
          </span>
          <span className="todo title">
            <strong>title: </strong>
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
