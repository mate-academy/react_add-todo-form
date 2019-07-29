import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ items }) {
  return (
    <>
      <td>
        {items.title}
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={items.completed}
        />
      </td>
    </>
  );
}

TodoItem.propTypes = {
  items: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
