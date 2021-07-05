import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr>
    <td>
      <input className="input-group mb-3 " type="checkbox" />
    </td>
    <td>{todo.title}</td>
    <td>
      {` ${todo.user.id}`}
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    user: PropTypes.object,
    id: PropTypes.number,
    title: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
