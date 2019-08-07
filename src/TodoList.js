import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.title}</td>
    <td>{todo.user.name}</td>
    <td><input type="checkbox" /></td>
  </tr>
);

TodoList.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default TodoList;
