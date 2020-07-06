import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, handleOnCheck }) => (
  <li>
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={event => handleOnCheck(event.target.value, todo.id)}
    />
    <span>{todo.title}</span>
    <span>
      user id: &nbsp;
      <strong>{todo.userId}</strong>
    </span>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any).isRequired,
  handleOnCheck: PropTypes.func.isRequired,
};
