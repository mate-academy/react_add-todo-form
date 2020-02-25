import React from 'react';
import PropTypes from 'prop-types';

export const Todo = ({ item: { title, completed, id, userId } }) => (
  <tr>
    <td className="todo-list__cell">{id}</td>
    <td className="todo-list__cell">{title}</td>
    <td className="todo-list__cell">{completed ? 'Done' : '-'}</td>
    <td className="todo-list__cell">{userId}</td>
  </tr>
);

Todo.propTypes = {
  item: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};
