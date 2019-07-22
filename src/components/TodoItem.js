import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <User currentUser={todo.user} />
    <td className="todo-list-table__task">
      {todo.title}
      {todo.completed
        ? <input type="checkbox" checked />
        : <input type="checkbox" /> }
    </td>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.object,
  }).isRequired,
};

export default TodoItem;
