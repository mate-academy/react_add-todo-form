import React from 'react';
import PropTypes from 'prop-types';

function TodoRows({ todo }) {
  return (
    <tr>
      <td className="cell">{todo.textTodo}</td>
      <td className="cell">{todo.selectName}</td>
      <td className="negative">
        <i className="icon close" />
        {todo.complete.toString()}
      </td>
    </tr>
  );
}

TodoRows.propTypes = {
  todo: PropTypes.shape({
    textTodo: PropTypes.string,
    selectName: PropTypes.string,
    complete: PropTypes.bool,
  }).isRequired,
};

export default TodoRows;
