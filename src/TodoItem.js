import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo, user }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>{user.name}</td>
    <td>{todo.completed ? 'true' : 'false'}</td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

export default TodoItem;
