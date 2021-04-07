import React from 'react';
import propTypes from 'prop-types';

import './todolist.css';

export const TodoList = ({ visibleList }) => (
  <ul className="list">
    {visibleList.map(todo => (
      <li key={todo.id}>
        {todo.id}
        .
        {todo.user.name}
        <br />
        {todo.title}
        :
        {todo.completed
          ? ' completed'
          : ' not completed'
        }
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  visibleList: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      title: propTypes.string.isRequired,
      todo: propTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
