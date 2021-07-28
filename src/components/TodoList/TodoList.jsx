import React from 'react';
import propTypes from 'prop-types';

export const TodoList = ({ todoList }) => (
  <ul className="list">
    {todoList.map(todo => (
      <li key={todo.id}>
        {`${todo.id}. ${todo.user}`}
        {`${todo.title}: ${todo.completed ? ' completed' : ' not completed'}`}
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todoList: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      user: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      completed: propTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
