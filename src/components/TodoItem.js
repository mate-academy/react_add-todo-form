import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ item }) {
  return (
    <>
      <td>
        {item.title}
      </td>
      <td>
        <input
          type="checkbox"
          defaultChecked={item.completed}
        />
      </td>
    </>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
