import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem({ item }) {
  return (
    <tr>
      <User user={item.user} />
      <td>
        {item.title}
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={item.completed}
        />
      </td>
    </tr>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
