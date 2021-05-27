import React from 'react';
import PropTypes from 'prop-types';
import './TodosList.css';

export const TodosList = ({ todos }) => (
  <>
    <ul className="list">
      {todos.map(todo => (
        <li key={todo.id} className="item">
          <h2 className="list__name">
            {`Name: ${todo.user.name}`}
          </h2>
          <p className="list__title">
            {`Title: ${todo.title}`}
          </p>
          <p className="list__completed">
            {`Completed: ${todo.completed}`}
          </p>
        </li>
      ))}
    </ul>
  </>
);

TodosList.propTypes = {
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
