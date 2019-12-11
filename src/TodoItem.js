import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>
      {`${todo.user.name}, email: ${todo.user.email}`}
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
