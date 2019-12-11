import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ item }) => {
  const { id, title, completed, user } = item;

  return (
    <tr>
      <td>{id}</td>
      <td>{title}</td>
      <td>{completed ? 'Yes' : 'No'}</td>
      <td>{user.name}</td>
      <td>{user.id}</td>
    </tr>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({ name: PropTypes.string }),
  }).isRequired,
};

export default TodoItem;
