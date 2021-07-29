import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todos }) => (
  <>
    <div className="container">
      {todos.map(todo => (
        <p key={todo.id}>
          <h2>
            {`Name: ${todo.user.name}`}
          </h2>
          <p>
            {`Title: ${todo.title}`}
          </p>
          <p>
            {`Completed: ${todo.completed}`}
          </p>
        </p>
      ))}
    </div>
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
