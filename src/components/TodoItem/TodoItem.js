import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, handleOnCheck }) => (
  <li className="row align-items-center text-left">
    <input
      className="col-1"
      type="checkbox"
      checked={todo.completed}
      onChange={event => handleOnCheck(event.target.value, todo.id)}
    />
    <span className="col">{todo.title}</span>
    <span className="col-3">
      user id: &nbsp;
      <strong>{todo.userId}</strong>
    </span>
  </li>
);

TodoItem.propTypes = {
  todo: PropTypes.objectOf(PropTypes.any).isRequired,
  handleOnCheck: PropTypes.func.isRequired,
};
