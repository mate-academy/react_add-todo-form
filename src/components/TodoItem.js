import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <tr>
    <th>{todo.id}</th>
    <th>{todo.title}</th>
    <th>{todo.user.username}</th>
    <th>{todo.status ? 'Done' : 'In progress'}</th>
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    status: PropTypes.bool,
  }).isRequired,
};

export default TodoItem;
