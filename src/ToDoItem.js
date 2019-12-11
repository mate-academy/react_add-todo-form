import React from 'react';
import PropTypes from 'prop-types';

const ToDoItem = ({ todo: { title, user: { name } } }) => (
  <tr>
    <td>
      {title}
    </td>
    <td>
      {name}
    </td>
  </tr>
);

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default ToDoItem;
