import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo: { id, title, user } }) {
  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{user}</td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    user: PropTypes.string,
  }).isRequired
};

export default TodoItem;
