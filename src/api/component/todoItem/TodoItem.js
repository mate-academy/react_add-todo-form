import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ id, title, executor }) => (
  <tr>
    <td>{id}</td>
    <td>{title}</td>
    <td>{executor}</td>
  </tr>
);

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  executor: PropTypes.string.isRequired,
};

export default TodoItem;
