import React from 'react';
import Proptypes from 'prop-types';

function TodoItem({ todo }) {
  return (
    <tr>
      <td className="cell">{todo.title}</td>
      <td className="cell">{todo.newTodo}</td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: Proptypes.shape({
    title: Proptypes.string,
    newTodo: Proptypes.string,
  }).isRequired,
};

export default TodoItem;
