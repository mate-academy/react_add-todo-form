import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <div className="ui cards">
    <h2>Todo list:</h2>
    {todos.map(todo => (
      <div className="card" key={todo.id}>
        <div className="content">
          <img
            className="right floated mini ui image"
            src={todo.user.imgUrl}
            alt="user"
          />
          <div className="header">
            {todo.user.name}
          </div>
          <div className="description">
            {todo.title}
          </div>
        </div>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};
