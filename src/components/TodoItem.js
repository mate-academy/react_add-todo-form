import React from 'react';
import Proptypes from 'prop-types';

function TodoItem({ todo }) {
  return (
    <tr>
      <td className="cell">{todo.title}</td>
      <td className="cell">{todo.assignedTo}</td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: Proptypes.shape({
    title: Proptypes.string,
    assignedTo: Proptypes.string,
  }).isRequired,
};

export default TodoItem;
